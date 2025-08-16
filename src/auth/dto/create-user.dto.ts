import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @ApiProperty({ description: 'User full name, 3 to 50 characters' })
  name: string;

  @IsEmail()
  @ApiProperty({ description: 'Valid email address' })
  email: string;

  @IsString()
  @MaxLength(16)
  @MinLength(8)
  @ApiProperty({ description: 'Password must be 8 to 16 characters long' })
  password: string;
}
