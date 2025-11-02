import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async authenticate(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!bcrypt.compareSync(password, user?.password ?? '')) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const payload = {
      sub: user?.id,
      email: user?.email,
      role: user?.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
