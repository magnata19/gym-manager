import { Module } from '@nestjs/common';
import { CustomUserLoggerService } from './custom-user-logger.service';

@Module({
  providers: [CustomUserLoggerService],
})
export class CustomLoggerModule {}
