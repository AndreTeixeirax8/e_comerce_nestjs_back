import { Injectable } from "@nestjs/common";
import {  InjectRepository } from "@nestjs/typeorm";
import { ClienteEntity } from "src/cliente/entities";
import {  Repository } from "typeorm";
import { CriaClienteDto, EditaClienteDto } from "src/cliente/dtos";
import { IClienteRepository } from "src/cliente/interfaces";
import { UUID } from "crypto";
import { UUIDDto } from "src/common/dtos";

@Injectable()
export class ClienteRepository implements IClienteRepository{
    constructor(
        @InjectRepository(ClienteEntity)
        private clienteRepository: Repository<ClienteEntity>,
    ){}

     criaUmRegistro(
        data: CriaClienteDto,
      ): Promise<CriaClienteDto> {
        return this.clienteRepository.save(data);
      }

       buscaTodos(): Promise<CriaClienteDto[]> {
        return this.clienteRepository.find();
      }

      editaUmRegistro(
        data: EditaClienteDto,
      ): Promise<EditaClienteDto> {
        return this.clienteRepository.save(data);
      }

      buscaUmPorId(id:string): Promise<CriaClienteDto> {
        return this.clienteRepository.findOneBy({id});
      }

      

    
}