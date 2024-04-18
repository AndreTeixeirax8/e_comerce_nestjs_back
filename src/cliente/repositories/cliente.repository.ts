import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { ClienteEntity } from "src/cliente/entities";
import { EntityManager, Repository } from "typeorm";
import { CriaClienteDto } from "src/cliente/dtos";
import { IClienteRepository } from "src/cliente/interfaces";

@Injectable()
export class ClienteRepository implements IClienteRepository{
    constructor(
        @InjectRepository(ClienteEntity)
        private clienteRepository: Repository<ClienteEntity>,
      // VERIFICAR  @InjectEntityManager() private postManager: EntityManager  
    ){}

     criaUmRegistro(
        data: CriaClienteDto,
      ): Promise<CriaClienteDto> {
        return this.clienteRepository.save(data);
      }

       buscaTodos(): Promise<CriaClienteDto[]> {
        return this.clienteRepository.find();
      }

    
}