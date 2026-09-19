import { IsOptional, IsString, IsInt, IsBoolean, IsObject } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional() @IsObject() name?: any;
  @IsOptional() @IsObject() title?: any;
  @IsOptional() @IsString() photo?: string;
  @IsOptional() @IsObject() tagline?: any;
  @IsOptional() @IsObject() verse?: any;
  @IsOptional() @IsString() cvFile?: string;
  @IsOptional() @IsObject() bio?: any;
  @IsOptional() @IsObject() qualifications?: any;
  @IsOptional() @IsInt() experienceYears?: number;
  @IsOptional() @IsObject() ageGroups?: any;
  @IsOptional() @IsObject() languages?: any;
  @IsOptional() @IsObject() teachingStyle?: any;
  @IsOptional() @IsBoolean() online?: boolean;
}
