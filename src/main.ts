import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { dirname, join } from 'path';
import { AppModule } from './app.module';
import 'dotenv/config';
import { HttpExceptionFilter } from './logging/http-exception.filter';
import { MyLoggerService } from './logging/my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLoggerService()
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);
  
  SwaggerModule.setup('doc', app, document);
  
  
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
