import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterDto } from 'src/auth/dto/create-user.dto';
import ApiResponse from 'src/utils/api.response';
import { hash, compare } from 'bcryptjs';
import { LoginDto } from './dto/login-dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import config from 'src/config';
import { emailUtil } from 'src/utils/email';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async loginUser(dto: LoginDto) {
    try {
      const user = await this.userService.getUserByEmail(dto.email);

      if (!user) {
        return ApiResponse.fail('User not found', null, 404);
      }

      const isPasswordValid = await compare(dto.password, user.password);
      if (!isPasswordValid) {
        return ApiResponse.fail('Invalid credentials', null, 401);
      }

      const token = this.jwtService.sign({ id: user.id }, { expiresIn: '1d' });

      return ApiResponse.success('Login successful', { token, user });
    } catch (error) {
      return ApiResponse.fail('Internal server error', error.message || error);
    }
  }

  async registerUser(dto: RegisterDto) {
    try {
      const hashedPassword = await hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
        },
      });

      return ApiResponse.success('User registered successfully', user, 201);
    } catch (error: any) {
      if (error.code === 'P2002') {
        const duplicateField = error.meta?.target?.[0] ?? 'Field';
        const formattedField = duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1);
        return ApiResponse.fail(`${formattedField} already exists`, null, 409);
      }
      return ApiResponse.fail('Internal server error', error.message || error);
    }
  }


  async getLoggedInUser(userId: string) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return ApiResponse.fail('User not found', null, 404);
      }
      return ApiResponse.success('User retrieved successfully', user);
    } catch (error) {
      return ApiResponse.fail('Internal server error', error.message || error);
    }
  }


  async forgotPassword(email: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (!user) return ApiResponse.fail("User not found!", null, 404);

      const resetToken = randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600 * 1000)

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken,
          resetTokenExpiry
        }

      })

      const resetLink = `${config().app.url}/auth/reset-password?token=${resetToken}`
      const emailSent = emailUtil.sendPasswordResetEmail(user.email, resetLink);

      if (!emailSent) return ApiResponse.fail('Failed to send reset email', null, 500);
      return ApiResponse.success('Password reset email sent. Check your inbox.', null);


    } catch (error) {
      return ApiResponse.fail("Internal server error", error.message || error)
    }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { resetToken: token, resetTokenExpiry: { gte: new Date() } }
      })

      console.log("Here is the user found: ", user)
      if (!user) return ApiResponse.fail('Invalid or expired reset token', null, 400);
      const hashedPassword = await hash(newPassword, 10);

      await this.prisma.user.update({
        where: { id: user.id },
        data: { resetToken: null, resetTokenExpiry: null, password: hashedPassword }
      })

      return ApiResponse.success('Password reset successfully', null);
    } catch (error) {
      return ApiResponse.fail("Internal server error", error.message || error)
    }
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) return ApiResponse.fail('User not found', null, 404);

      const isOldPasswordValid = await compare(oldPassword, user.password);
      if(!isOldPasswordValid) return ApiResponse.fail("Old Password Incorrect", null , 401);
      
      const hashedPassword = await hash(newPassword, 10);

      await this.prisma.user.update({
        where: { id: user.id},
        data: { password: hashedPassword}
      })

      return ApiResponse.success("Password Changed Successfully", null,200)

    } catch (error) {
      return ApiResponse.fail("Internal server error", error.message || error)
    }
  }
}
