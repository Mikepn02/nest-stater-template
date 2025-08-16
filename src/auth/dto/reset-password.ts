import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetForgotPasswordDto {
  @ApiProperty({
    description: "The password reset token sent to the user's email",
  })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ description: 'The new password to set' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  newPassword: string;
}
