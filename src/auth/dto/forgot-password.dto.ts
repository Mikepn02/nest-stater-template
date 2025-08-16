import { IsEmail } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}
