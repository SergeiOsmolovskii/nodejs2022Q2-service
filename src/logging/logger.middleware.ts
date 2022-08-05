import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  
  private logger = new Logger('HTTP');
  
  use(req: Request, res: Response, next: NextFunction): void  {

    const { method, query, body, baseUrl } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      const log = `method:${method} statusCode:${statusCode} baseUrl:${baseUrl} body:${JSON.stringify(body)} query: ${JSON.stringify(query)}`;
      this.logger.log(log);
    })

    next();
  }
}
