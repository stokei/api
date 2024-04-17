import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown) {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      msg = exception.message;
    }

    const body = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: msg
    };

    this.writeHttpLog(body);
    return exception;
  }

  private async writeHttpLog(data: Record<string, any>) {
    const LOGS_DIR = join(__dirname, `${Date.now()}-log.json`); // dist/exceptions

    try {
      await writeFile(LOGS_DIR, JSON.stringify(data));
    } catch (err) {
      return;
    }
  }
}
