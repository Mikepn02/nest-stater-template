import { IsEmail, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;
}
