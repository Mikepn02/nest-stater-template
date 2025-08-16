import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

export class AppExceptionHandler implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    throw new Error('Method not implemented.');
  }
}
