import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IMessageInterface } from './interface/IMessageResponse';
import { CustomUserLoggerService } from 'src/custom-loggers/custom-user-logger.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IResponseUserDto } from './dto/response-user.dto';
import { NotFoundExceptionDocResponse } from 'src/shared/utils/not-found-exception-doc-response';
import { HashPasswordPipe } from 'src/pipes/hash-password.pipe';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { IRequest } from 'src/shared/interface/IRequest';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private logger: CustomUserLoggerService,
  ) {}

  @ApiOperation({ summary: 'Cria um novo usuário.' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @Post()
  async createUser(
    @Body() data: CreateUserDto,
    @Body('password', HashPasswordPipe) hashPassword: string,
  ): Promise<IMessageInterface> {
    this.logger.setContext('UsersController');
    this.logger.colorizedLog(data);
    return this.usersService.createUser({
      ...data,
      password: hashPassword,
    });
  }

  @ApiOperation({ summary: 'Recupera todos os usuários.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários recuperada com sucesso.',
    type: [IResponseUserDto],
  })
  @Get()
  @UseGuards(AuthGuard)
  async getUsers(): Promise<IResponseUserDto[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Recupera um usuário pelo ID.' })
  @ApiResponse({
    status: 200,
    type: IResponseUserDto,
    description: 'Usuário recuperado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    type: NotFoundExceptionDocResponse,
    description: 'Usuário não encontrado.',
  })
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<IResponseUserDto> {
    const user = await this.usersService.getUserById(id);
    return {
      id: user.id ?? '',
      name: user.name,
      email: user.email,
      role: user.role ?? [],
    };
  }

  @ApiOperation({ summary: 'Atualiza um usuário pelo ID.' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    type: NotFoundExceptionDocResponse,
    description: 'Usuário não encontrado.',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() body: Partial<CreateUserDto>,
    @Body('password', HashPasswordPipe) hashPassword: string,
    @Req() request: IRequest,
  ): Promise<IMessageInterface> {
    console.log('Controller:', request.user);
    return this.usersService.updateUser(
      id,
      {
        ...body,
        password: hashPassword,
      },
      request,
    );
  }

  @ApiOperation({ summary: 'Deleta um usuário pelo ID.' })
  @ApiResponse({
    status: 204,
    description: 'Usuário deletado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    type: NotFoundExceptionDocResponse,
    description: 'Usuário não encontrado.',
  })
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
