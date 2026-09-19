import { Module } from '@nestjs/common';
import { QuranTeacherController } from './quran-teacher.controller';
import { QuranTeacherService } from './quran-teacher.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [QuranTeacherController],
  providers: [QuranTeacherService],
})
export class QuranTeacherModule {}
