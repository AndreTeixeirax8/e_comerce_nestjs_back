import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { APP_GUARD } from '@nestjs/core';
import { ProductEntity } from './product/entities';
import { UserEntity } from './users/entities';
import { ClienteEntity } from './cliente/entities';
import { AtendimentoEntity } from './atendimento/entities';
import { OrigemAtendimentoEntity } from './origem_atendimento/entities';
import { TipoServicoEntity } from './tipo_servico/entities';
import { ProductModule } from './product';
import { ClienteModule } from './cliente';
import { AtendimentoModule } from './atendimento';
import { OrigemAtendimentoModule } from './origem_atendimento';
import { TipoServicoModule } from './tipo_servico';
import { RolesGuard } from './auth';
//import { DataBaseConfig } from 'src/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      //host: 'localhost',
      host: 'ep-sweet-resonance-a4a01kcf.us-east-1.aws.neon.tech', // `${DataBaseConfig.DB_HOST}`,
      port: 5432,
      //port: 5432,
      // username: 'postgres',
      username: 'default', //`${DataBaseConfig.DB_USERNAME}`, // Converte para string
      password: 'FPi3E5XJCQsy', // `${DataBaseConfig.DB_PASSWORD}`, // Converte para string
      database: 'verceldb', // `${DataBaseConfig.DB_DATABASE}`, // Converte para string
      // password: 'admin',
      //database: 'e_comerce_nestjs_back',
      entities: [
        ProductEntity,
        UserEntity,
        ClienteEntity,
        AtendimentoEntity,
        OrigemAtendimentoEntity,
        TipoServicoEntity,
      ],
      synchronize: true, // não deixar funcionando em produção
      logging: true,
    }),
    ProductModule,
    AuthModule,
    UsersModule,
    ClienteModule,
    AtendimentoModule,
    OrigemAtendimentoModule,
    TipoServicoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
