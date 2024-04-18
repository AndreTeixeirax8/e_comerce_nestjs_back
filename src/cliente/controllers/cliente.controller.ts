import { Body, Controller, Get, Post } from "@nestjs/common";
import { CriaClienteDto } from "src/cliente/dtos";
import { IClienteRepository } from "../interfaces";

@Controller('cliente')
export class ClienteController{
    constructor(
        private readonly clienteRepository:IClienteRepository
    ){}


    @Post()
    criaUmRegistro(@Body() data:CriaClienteDto){
      return this.clienteRepository.criaUmRegistro(data)
    }

    @Get()
    buscaTodosRRegistros(){
        return this.clienteRepository.buscaTodos()
    }

    //CRIADO CONTROLLER , FALTA TESTAR E ADICIONAR O MODULO
}