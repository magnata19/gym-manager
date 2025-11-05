import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnauthorizedExceptionDocResponse } from 'src/shared/utils/unauthorized-exception';
import { JwtAccessTokenDocResponse } from 'src/shared/utils/jwt-token-doc';

@Controller('login')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Autentica um usuário e retorna um token JWT.' })
  @ApiResponse({
    status: 401,
    description: 'E-mail ou senha inválidos.',
    type: UnauthorizedExceptionDocResponse,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado com sucesso.',
    type: JwtAccessTokenDocResponse,
  })
  async authenticate(@Body() data: LoginDto) {
    return this.authService.authenticate(data.email, data.password);
  }
}
