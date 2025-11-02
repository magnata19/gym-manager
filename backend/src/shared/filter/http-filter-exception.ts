/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class HttpFilterException implements ExceptionFilter {
  constructor(
    private httpAdapter: HttpAdapterHost,
    private logger: ConsoleLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);

    const { httpAdapter } = this.httpAdapter;

    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    const { statusCode, body } =
      exception instanceof HttpException
        ? {
            statusCode: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(request),
            },
          };

    httpAdapter.reply(response, body, statusCode);
  }
}
