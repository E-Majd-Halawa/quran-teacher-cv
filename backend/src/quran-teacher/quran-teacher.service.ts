import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ReplySessionDto } from './dto/reply-session.dto';

@Injectable()
export class QuranTeacherService {
  constructor(private prisma: PrismaService) {}

  async getProfile() {
    const profile = await this.prisma.teacherProfile.findFirst({
      include: {
        specialties: { orderBy: { order: 'asc' } },
        certificates: { orderBy: { order: 'asc' } },
        experiences: { orderBy: { order: 'asc' } },
        methodologies: { orderBy: { order: 'asc' } },
        testimonials: { orderBy: { order: 'asc' } },
        countries: { orderBy: { order: 'asc' } },
        languageSkills: { orderBy: { order: 'asc' } },
        skills: { orderBy: { order: 'asc' } },
      },
    });

    if (!profile) throw new NotFoundException('Teacher profile not found');

    // Reshape to frontend format
    return {
      name: profile.name,
      title: profile.title,
      photo: profile.photo,
      tagline: profile.tagline,
      verse: profile.verse,
      cvFile: profile.cvFile,
      about: {
        bio: profile.bio,
        qualifications: profile.qualifications,
        experienceYears: profile.experienceYears,
        ageGroups: profile.ageGroups,
        languages: profile.languages,
        teachingStyle: profile.teachingStyle,
        online: profile.online,
      },
      specialties: profile.specialties,
      certificates: profile.certificates,
      experience: profile.experiences,
      methodology: profile.methodologies,
      stats: {
        students: profile.statsStudents,
        experienceYears: profile.experienceYears,
        surahsTaught: profile.statsSurahsTaught,
        teachingHours: profile.statsTeachingHours,
      },
      testimonials: profile.testimonials,
      countries: profile.countries,
      languageSkills: profile.languageSkills,
      skills: profile.skills,
      contact: {
        whatsapp: { number: profile.contactWhatsappNumber, link: profile.contactWhatsappLink },
        email: profile.contactEmail,
        telegram: profile.contactTelegram,
        facebook: profile.contactFacebook,
        linkedin: profile.contactLinkedin,
      },
      whatsappMessage: profile.whatsappMessage,
    };
  }

  async updateProfile(dto: UpdateProfileDto) {
    const profile = await this.prisma.teacherProfile.findFirst();
    if (!profile) throw new NotFoundException('Teacher profile not found');
    return this.prisma.teacherProfile.update({ where: { id: profile.id }, data: dto });
  }

  async createSession(dto: CreateSessionDto, userId?: number) {
    const requestedTime = new Date(dto.requestedTime);
    if (isNaN(requestedTime.getTime())) {
      throw new BadRequestException('Invalid date');
    }
    const now = Date.now();
    if (requestedTime.getTime() < now + 60 * 60 * 1000) {
      throw new BadRequestException('Requested time must be at least 1 hour from now');
    }
    if (requestedTime.getTime() > now + 180 * 24 * 60 * 60 * 1000) {
      throw new BadRequestException('Requested time is too far in the future');
    }

    const windowMs = 60 * 60 * 1000;
    const conflict = await this.prisma.session.findFirst({
      where: {
        status: 'CONFIRMED',
        requestedTime: {
          gt: new Date(requestedTime.getTime() - windowMs),
          lt: new Date(requestedTime.getTime() + windowMs),
        },
      },
    });
    if (conflict) {
      throw new BadRequestException('This time slot is not available');
    }

    const pendingCount = await this.prisma.session.count({
      where: { contactInfo: dto.contactInfo, status: 'PENDING' },
    });
    if (pendingCount >= 3) {
      throw new BadRequestException('Too many pending requests for this contact');
    }

    return this.prisma.session.create({
      data: {
        studentName: dto.studentName,
        contactInfo: dto.contactInfo,
        requestedTime,
        notes: dto.notes,
        userId,
      },
    });
  }

  private notFoundOnMissing(error: unknown, message: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new NotFoundException(message);
    }
    throw error;
  }

  async getSessions() {
    return this.prisma.session.findMany({ orderBy: { requestedTime: 'desc' } });
  }

  async getMySessions(userId: number) {
    return this.prisma.session.findMany({
      where: { userId },
      orderBy: { requestedTime: 'desc' },
    });
  }

  async deleteSession(id: number) {
    try {
      return await this.prisma.session.delete({ where: { id } });
    } catch (error) {
      this.notFoundOnMissing(error, 'Session not found');
    }
  }

  async updateSession(id: number, dto: UpdateSessionDto) {
    try {
      return await this.prisma.session.update({ where: { id }, data: dto });
    } catch (error) {
      this.notFoundOnMissing(error, 'Session not found');
    }
  }

  async replyToSession(id: number, dto: ReplySessionDto) {
    try {
      return await this.prisma.session.update({
        where: { id },
        data: {
          adminReply: dto.adminReply,
          adminReplyAt: new Date(),
          replySeenAt: null,
        },
      });
    } catch (error) {
      this.notFoundOnMissing(error, 'Session not found');
    }
  }

  async markReplySeen(id: number, userId: number) {
    const session = await this.prisma.session.findUnique({ where: { id } });
    if (!session) throw new NotFoundException('Session not found');
    if (session.userId !== userId) throw new ForbiddenException('Not your session');
    if (!session.replySeenAt) {
      return this.prisma.session.update({
        where: { id },
        data: { replySeenAt: new Date() },
      });
    }
    return session;
  }

  async getMyNotifications(userId: number) {
    return this.prisma.session.findMany({
      where: { userId, adminReply: { not: null } },
      orderBy: { adminReplyAt: 'desc' },
    });
  }
}
