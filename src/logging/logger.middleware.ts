import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  
  private logger = new Logger('HTTP');
  
  use(req: Request, res: Response, next: NextFunction): void  {

    const { method, query, body } = req;

    res.on('finish', () => {
      const { statusMessage, statusCode } = res;
      const log = `${new Date().toUTCString()} [Request] ${req.url} ${method} ${JSON.stringify(body)} ${JSON.stringify(query)} [Response] ${res.statusCode} ${JSON.stringify(statusMessage)}`;
    
      if (statusCode >= 200 && statusCode < 300) {
        this.logger.log(log);
      }

      if (statusCode >= 400 && statusCode < 500) {
        this.logger.error(log);
      }

      if (statusCode >= 500) {
        this.logger.error(log);
      }
    });
    next();
  }
}
