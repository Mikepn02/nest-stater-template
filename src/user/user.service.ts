import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterDto } from '../auth/dto/create-user.dto';
import { hash } from 'bcrypt';
import ApiResponse from 'src/utils/api.response';


@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService
    ) { }



    async getUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }

    async getUserById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    }

}
