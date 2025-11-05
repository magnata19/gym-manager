import { ConsoleLogger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersRepository } from './users.repository';
import { CustomUserLoggerService } from 'src/custom-loggers/custom-user-logger.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    ConsoleLogger,
    CustomUserLoggerService,
  ],
  imports: [PrismaModule],
})
export class UsersModule {}
