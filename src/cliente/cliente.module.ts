import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClienteEntity } from "src/cliente/entities";
import { ClienteController } from "src/cliente/controllers";
import { IClienteRepository } from "src/cliente/interfaces";
import { ClienteRepository } from "src/cliente/repositories";


@Module({
    imports:[TypeOrmModule.forFeature([ClienteEntity])],
    controllers: [ClienteController],
    providers: [
      {
        provide:IClienteRepository,
        useClass:ClienteRepository
      },
     
    ],


    exports:[IClienteRepository]
  })
  export class ClienteModule {}
  