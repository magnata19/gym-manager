import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IMessageInterface } from './interface/IMessageResponse';
import { CustomUserLoggerService } from 'src/custom-loggers/custom-user-logger.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IResponseUserDto } from './dto/response-user.dto';
import { NotFoundExceptionDocResponse } from 'src/shared/utils/not-found-exception-doc-response';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private logger: CustomUserLoggerService,
  ) {}

  @ApiOperation({ summary: 'Cria um novo usuário.' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<IMessageInterface> {
    this.logger.setContext('UsersController');
    this.logger.colorizedLog(data);
    return this.usersService.createUser(data);
  }

  @ApiOperation({ summary: 'Recupera todos os usuários.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários recuperada com sucesso.',
    type: [IResponseUserDto],
  })
  @Get()
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
      id: user.id!,
      name: user.name,
      email: user.email,
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
  async updateUser(
    @Param('id') id: string,
    @Body() body: Partial<CreateUserDto>,
  ): Promise<IMessageInterface> {
    return this.usersService.updateUser(id, body);
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
