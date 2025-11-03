/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUser } from './interface/IUser';
import { IMessageInterface } from './interface/IMessageResponse';
import { IResponseUserDto } from './dto/response-user.dto';
import { UserRole } from './interface/UserRole';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(data: IUser): Promise<IMessageInterface> {
    const user = await this.usersRepository.getUserById(data.id ?? '');

    if (user) {
      throw new HttpException(
        `Usuário já cadastrado com o ID: ${data.id}`,
        400,
      );
    }
    await this.usersRepository.createUser(data);
    return { message: 'Usuário criado com sucesso!' };
  }

  async getAllUsers(): Promise<IResponseUserDto[]> {
    const users = await this.usersRepository.getUsers();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })) as IResponseUserDto[];
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  async updateUser(
    id: string,
    body: Partial<IUser>,
  ): Promise<IMessageInterface> {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    await this.usersRepository.updateUser(id, body);
    return { message: 'Usuário atualizado com sucesso!' };
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    await this.usersRepository.deleteUser(id);
  }

  async addUserRole(id: string, role: UserRole): Promise<IMessageInterface> {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return {
      message: `Função ${role} adicionada ao usuário ${id} com sucesso!`,
    };
  }
}
