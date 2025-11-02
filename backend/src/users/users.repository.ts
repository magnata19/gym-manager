import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser } from './interface/IUser';

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: IUser): Promise<any> {
    return this.prismaService.user.create({
      data,
    });
  }

  async getUsers(): Promise<IUser[]> {
    return this.prismaService.user.findMany();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<any> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
