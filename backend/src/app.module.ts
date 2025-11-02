import { ConsoleLogger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpFilterException } from './shared/filter/http-filter-exception';
import { GlobalLoggerInterceptor } from './shared/interceptor/global.interceptor';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    ConsoleLogger,
    {
      provide: APP_FILTER,
      useClass: HttpFilterException,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalLoggerInterceptor,
    },
  ],
})
export class AppModule {}
