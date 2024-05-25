import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoServicoEntity } from 'src/tipo_servico/entities';
import { TipoServicoController } from 'src/tipo_servico/controllers';
import { ITipoServicoRepository } from 'src/tipo_servico/interfaces';
import { TipoServicoRepository } from 'src/tipo_servico/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([TipoServicoEntity])],
  controllers: [TipoServicoController],
  providers: [
    {
      provide: ITipoServicoRepository,
      useClass: TipoServicoRepository,
    },
  ],

  exports: [ITipoServicoRepository],
})
export class TipoServicoModule {}
