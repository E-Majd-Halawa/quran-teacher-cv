import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  studentName: string;

  @IsString()
  @IsNotEmpty()
  contactInfo: string;

  @IsDateString()
  @IsNotEmpty()
  requestedTime: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
