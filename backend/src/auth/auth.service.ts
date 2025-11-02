import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async authenticate(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
  }
}
