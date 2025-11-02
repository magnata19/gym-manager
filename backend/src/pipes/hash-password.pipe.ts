import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}
  transform(password: string) {
    const salt = this.configService.get<string>('SALT_ROUNDS');
    return bcrypt.hashSync(password, salt);
  }
}
