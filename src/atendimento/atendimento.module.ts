import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AtendimentoEntity } from "src/atendimento/entities";
import { AtendimentoController } from "src/atendimento/controllers";
import { IAtendimentoRepository } from "src/atendimento/interfaces";
import { AtendimentoRepository } from "src/atendimento/repositories";

@Module({
    imports:[TypeOrmModule.forFeature([AtendimentoEntity])],
    controllers: [AtendimentoController],
    providers: [
      {
        provide:IAtendimentoRepository,
        useClass:AtendimentoRepository
      }],
    exports:[IAtendimentoRepository]
  })
  export class AtendimentoModule {}
  