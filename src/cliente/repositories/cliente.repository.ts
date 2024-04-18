import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { ClienteEntity } from "src/cliente/entities";
import { EntityManager, Repository } from "typeorm";
import { CriaClienteDto } from "src/cliente/dtos";

@Injectable()
export class ClienteRepository{
    constructor(
        @InjectRepository(ClienteEntity)
        private clienteRepository: Repository<ClienteEntity>,
      // VERIFICAR  @InjectEntityManager() private postManager: EntityManager  
    ){}

    async criaUmRegistro(
        data: CriaClienteDto,
      ): Promise<CriaClienteDto> {
        return this.clienteRepository.save(data);
      }
    
}