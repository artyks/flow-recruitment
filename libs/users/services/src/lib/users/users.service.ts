import { PrismaClientService } from '@flow-recruitment/prisma/client';
import { RegisterUserDto } from '@flow-recruitment/users/dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClientService) {}

  async createOne({ email, password }: RegisterUserDto) {
    return await this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
