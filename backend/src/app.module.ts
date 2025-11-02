import { ConsoleLogger, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpFilterException } from './shared/filter/http-filter-exception';
import { GlobalLoggerInterceptor } from './shared/interceptor/global.interceptor';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [],
  providers: [
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
