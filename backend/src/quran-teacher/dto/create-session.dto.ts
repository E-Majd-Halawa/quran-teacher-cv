import { IsString, IsNotEmpty, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  studentName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  contactInfo: string;

  @IsDateString()
  requestedTime: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  notes?: string;
}
