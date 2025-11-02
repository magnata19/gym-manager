import { ConsoleLogger, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpFilterException } from './shared/filter/http-filter-exception';
import { GlobalLoggerInterceptor } from './shared/interceptor/global.interceptor';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
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
