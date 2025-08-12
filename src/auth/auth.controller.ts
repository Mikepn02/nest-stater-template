import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./dto/login-dto";
import type { Response, Request } from "express";
import { RegisterDto } from "./dto/create-user.dto";
import { AuthGuard } from "./auth.guard";




@Controller("auth")
@ApiTags("Auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }


    @Post("login")
    async login(@Body() dto: LoginDto, @Res() res: Response) {
        const response = await this.authService.loginUser(dto);
        return res.status(response.status).json(response);
    }


    @Post("register")
    async register(@Body() dto: RegisterDto, @Res() res: Response) {
        const response = await this.authService.registerUser(dto);
        return res.status(response.status).json(response);
    }

    @Get("me")
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    async getMe(@Req() req: Request) {
        const userId = req.user.id;
        const response = await this.authService.getLoggedInUser(userId);
        return response;
    }
}