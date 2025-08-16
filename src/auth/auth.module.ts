import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config().jwt.secret,
      signOptions: { expiresIn: config().jwt.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, AuthGuard],
})
export class AuthModule {}
