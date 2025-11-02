import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const preRequestTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const { method, url } = request;
        const requestTime = Date.now() - preRequestTime;
        this.logger.log(`${method} - ${url} - ${requestTime}ms`);
      }),
    );
  }
}
