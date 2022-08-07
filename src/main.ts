import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { dirname, join } from 'path';
import { AppModule } from './app.module';
import 'dotenv/config';
import { AllExceptionFilter } from './logging/allException.filter';
import { MyLoggerService } from './logging/my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllExceptionFilter());
  app.useLogger(new MyLoggerService());

  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);
  
  SwaggerModule.setup('doc', app, document);
  
  
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
