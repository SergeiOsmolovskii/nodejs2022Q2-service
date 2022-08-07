import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { writeLogsToFile } from '../modules/helpers/logsToFile';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private logger = new Logger();
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const status = exception.getStatus();
    let { message } = exception;
    
    if (exception instanceof HttpException) {
      this.logger.error(`${req.method} ${req.url}`, message);
      writeLogsToFile(`${req.method} ${req.url}`, 'error', 'src/logs/allLogs');
      status === 500 ? (message = 'Server Error') : message;
    }
    
    res.status(status).json({
      statusCode: status,
      url: req.url,
      message,
    });
  }
}