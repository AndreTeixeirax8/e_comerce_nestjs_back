//remover esse comentario para rodar localmente
/*
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  console.log('Servidor rodado na porta 3000');
}
bootstrap();*/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();

  return app.getHttpAdapter().getInstance();
}

let app;

export default async function handler(req, res) {
  if (!app) {
    app = await bootstrap();
  }
  app(req, res);
}

// Esta linha não é necessária em um ambiente serverless
// bootstrap();*/
