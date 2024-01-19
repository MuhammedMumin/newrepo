import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | BadRequestException
      | ConflictException
      | UnauthorizedException
      | ForbiddenException
      | InternalServerErrorException
      | NotFoundException
      | MethodNotAllowedException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus ? exception.getStatus() : 500;
    let exres = (
      exception.getResponse
        ? exception.getResponse()
        : { message: exception.message }
    ) as Record<string, any>;
    response.status(status).json({
      code: status,
      message: exception.message,
      data: exres?.data,
      meta: { info: exres.message },
    });
  }
}
