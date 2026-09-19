import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { createHash } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthResponseDto, UserResponseDto } from './dto/auth-response.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private getBcryptCost(): number {
    return this.configService.get<number>('bcrypt.cost') || 12;
  }

  private getAccessTokenExpiry(): string {
    return this.configService.get<string>('jwt.accessExpiry') || '15m';
  }

  private getRefreshTokenExpiry(): string {
    return this.configService.get<string>('jwt.refreshExpiry') || '7d';
  }

  private generateTokens(user: { id: number; email: string; role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
      expiresIn: this.getRefreshTokenExpiry(),
    });
    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(userId: number, token: string): Promise<void> {
    const expiresInDays = parseInt(this.getRefreshTokenExpiry().replace('d', ''), 10) || 7;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    await this.prisma.refreshToken.create({
      data: {
        token: this.hashToken(token),
        userId,
        expiresAt,
      },
    });
  }

  private async revokeRefreshToken(token: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: { token: this.hashToken(token) },
    });
  }

  private async revokeAllUserRefreshTokens(userId: number): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  async signup(dto: SignupDto): Promise<AuthResponseDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, this.getBcryptCost());

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });

    const { accessToken, refreshToken } = this.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    await this.saveRefreshToken(user.id, refreshToken);

    return this.buildAuthResponse(user, accessToken, refreshToken);
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken, refreshToken } = this.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    await this.saveRefreshToken(user.id, refreshToken);

    return this.buildAuthResponse(user, accessToken, refreshToken);
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto> {
    const { refreshToken } = refreshTokenDto;

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
      });

      const storedToken = await this.prisma.refreshToken.findUnique({
        where: { token: this.hashToken(refreshToken) },
        include: { user: true },
      });

      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new UnauthorizedException('Refresh token invalid or expired');
      }

      if (!storedToken.user.isActive) {
        throw new UnauthorizedException('User inactive');
      }

      await this.revokeRefreshToken(refreshToken);

      const { accessToken, refreshToken: newRefreshToken } = this.generateTokens({
        id: storedToken.user.id,
        email: storedToken.user.email,
        role: storedToken.user.role,
      });

      await this.saveRefreshToken(storedToken.user.id, newRefreshToken);

      return this.buildAuthResponse(storedToken.user, accessToken, newRefreshToken);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(refreshToken: string): Promise<void> {
    await this.revokeRefreshToken(refreshToken);
  }

  async logoutAll(userId: number): Promise<void> {
    await this.revokeAllUserRefreshTokens(userId);
  }

  async getProfile(userId: number): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async updateProfile(userId: number, dto: UpdateProfileDto): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, this.getBcryptCost());
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    await this.revokeAllUserRefreshTokens(userId);

    return { message: 'Password updated successfully' };
  }

  private buildAuthResponse(
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      createdAt: Date;
    },
    accessToken: string,
    refreshToken: string,
  ): AuthResponseDto {
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt,
      },
      accessToken,
      refreshToken,
    };
  }
}