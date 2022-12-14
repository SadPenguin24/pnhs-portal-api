import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as bodyParser from 'body-parser';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb' }));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  //change origin in dev

  app.enableCors();
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
