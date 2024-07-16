//remover esse comentario para rodar localmente

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.enableCors();
  //teste de cors
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://ecomercenestjsback-production.up.railway.app',
      'https://e-comerce-angular-front.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  await app.listen(3000);
  console.log('Servidor rodado na porta 3000');
}
bootstrap();
