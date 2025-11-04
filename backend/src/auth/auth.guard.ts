/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IRequest } from 'src/shared/interface/IRequest';
import { IAuthenticate } from './interface/iauthenticate';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequest>();
    const token = this.getTokenFromHeader(request);

    if (!token) {
      throw new BadRequestException('Token de autenticação não fornecido');
    }
    try {
      const payload: IAuthenticate = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('SECRET_KEY'),
      });
      request.user = payload;
    } catch (err) {
      throw new BadRequestException('Token de autenticação inválido');
    }
    return true;
  }

  private getTokenFromHeader(request: IRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
