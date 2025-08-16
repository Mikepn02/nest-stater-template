import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ValidPassword } from 'src/decorators/valid-password.decorator';

export class ChangePasswordDto {
  @ApiProperty({ description: "The user's current password" })
  @IsNotEmpty({ message: 'Old password is required' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ description: 'The new password to set' })
  @IsNotEmpty({ message: 'New password is required' })
  @IsString()
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  @ValidPassword({ message: 'Password is too weak' })
  newPassword: string;
}
