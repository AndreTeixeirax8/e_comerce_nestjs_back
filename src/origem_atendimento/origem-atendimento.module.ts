import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrigemAtendimentoEntity } from "src/origem_atendimento/entities";
import { OrigemAtendimentoController } from "src/origem_atendimento/controllers";
import { IOrigemAtendimentoRepository } from "src/origem_atendimento/interfaces";
import { OrigemAtendimentoRepository } from "src/origem_atendimento/repositories";

@Module({
    imports:[TypeOrmModule.forFeature([OrigemAtendimentoEntity])],
    controllers: [OrigemAtendimentoController],
    providers: [
      {
        provide:IOrigemAtendimentoRepository,
        useClass:OrigemAtendimentoRepository
      },
     
    ],


    exports:[IOrigemAtendimentoRepository]
  })
  export class OrigemAtendimentoModule {}