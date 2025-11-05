import { ConsoleLogger, Injectable } from '@nestjs/common';
import { bgMagenta, white } from 'colors';
import { IUser } from 'src/modules/users/interface/IUser';

@Injectable()
export class CustomUserLoggerService extends ConsoleLogger {
  logFormatter(name, email) {
    return `User Created: Name - ${name}, Email - ${email}`;
  }

  colorizedLog(user: IUser) {
    const { name, email } = user;
    const formatedLog = this.logFormatter(name, email);
    console.log(bgMagenta(white(formatedLog)));
  }
}
