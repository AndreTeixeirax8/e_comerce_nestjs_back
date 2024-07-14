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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'e_comerce_nestjs_back',
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
