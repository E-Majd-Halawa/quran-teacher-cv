import { Controller, Get, Patch, Post, Delete, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { QuranTeacherService } from './quran-teacher.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ReplySessionDto } from './dto/reply-session.dto';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('quran-teacher')
export class QuranTeacherController {
  constructor(private readonly teacherService: QuranTeacherService) {}

  @Get('profile')
  async getProfile() {
    return this.teacherService.getProfile();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('profile')
  async updateProfile(@Body() dto: UpdateProfileDto) {
    return this.teacherService.updateProfile(dto);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Post('sessions')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async createSession(@Body() dto: CreateSessionDto, @CurrentUser('id') userId?: number) {
    return this.teacherService.createSession(dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('sessions')
  async getSessions() {
    return this.teacherService.getSessions();
  }

  @UseGuards(JwtAuthGuard)
  @Get('sessions/notifications/my')
  async getMyNotifications(@CurrentUser('id') userId: number) {
    return this.teacherService.getMyNotifications(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('sessions/my')
  async getMySessions(@CurrentUser('id') userId: number) {
    return this.teacherService.getMySessions(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('sessions/:id/reply')
  async replyToSession(@Param('id', ParseIntPipe) id: number, @Body() dto: ReplySessionDto) {
    return this.teacherService.replyToSession(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('sessions/:id/seen')
  async markReplySeen(@Param('id', ParseIntPipe) id: number, @CurrentUser('id') userId: number) {
    return this.teacherService.markReplySeen(id, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('sessions/:id')
  async updateSession(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSessionDto) {
    return this.teacherService.updateSession(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete('sessions/:id')
  async deleteSession(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.deleteSession(id);
  }
}
