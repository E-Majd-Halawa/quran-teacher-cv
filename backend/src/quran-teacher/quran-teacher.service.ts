import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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
    return this.prisma.session.create({ data: { ...dto, userId } });
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
    return this.prisma.session.delete({ where: { id } });
  }

  async updateSession(id: number, dto: UpdateSessionDto) {
    return this.prisma.session.update({ where: { id }, data: dto });
  }

  async replyToSession(id: number, dto: ReplySessionDto) {
    return this.prisma.session.update({
      where: { id },
      data: {
        adminReply: dto.adminReply,
        adminReplyAt: new Date(),
        replySeenAt: null,
      },
    });
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
