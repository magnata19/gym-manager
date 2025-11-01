import { HttpException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUser } from './interface/IUser';
import { IMessageInterface } from './interface/IMessageResponse';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(data: IUser): Promise<IMessageInterface> {
    const user = await this.usersRepository.getUserByEmail(data.email);
    if (user) {
      throw new HttpException(
        `Usuário já cadastrado com o email: ${data.email}`,
        400,
      );
    }
    await this.usersRepository.createUser(data);
    return { message: 'Usuário criado com sucesso!' };
  }
}
