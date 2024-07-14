import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product';
import { ProductEntity } from 'src/product/entities';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from 'src/users/entities';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/roles.guard';
import { ClienteEntity } from 'src/cliente/entities';
import { ClienteModule } from 'src/cliente';
import { AtendimentoModule } from 'src/atendimento';
import { AtendimentoEntity } from 'src/atendimento/entities';
import { OrigemAtendimentoEntity } from 'src/origem_atendimento/entities';
import { OrigemAtendimentoModule } from 'src/origem_atendimento';
import { TipoServicoEntity } from 'src/tipo_servico/entities';
import { TipoServicoModule } from 'src/tipo_servico/tipo-servico.module';

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
