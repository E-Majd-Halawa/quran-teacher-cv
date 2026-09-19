import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class ReplySessionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  adminReply: string;
}
