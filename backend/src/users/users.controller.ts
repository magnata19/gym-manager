import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IMessageInterface } from './interface/IMessageResponse';
import { CustomUserLoggerService } from 'src/custom-loggers/custom-user-logger.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private logger: CustomUserLoggerService,
  ) {}

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<IMessageInterface> {
    this.logger.setContext('UsersController');
    this.logger.colorizedLog(data);
    return this.usersService.createUser(data);
  }
}
