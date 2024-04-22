import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClienteEntity } from "./entities";
import { ClienteController } from "./controllers";
import { IClienteRepository } from "./interfaces";
import { ClienteRepository } from "./repositories";

@Module({
    imports:[TypeOrmModule.forFeature([ClienteEntity])],
    controllers: [ClienteController],
    providers: [
      {
        provide:IClienteRepository,
        useClass:ClienteRepository
      }],
    exports:[IClienteRepository]
  })
  export class ClienteModule {}
  