import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CriaClienteDto, EditaClienteDto } from "src/cliente/dtos";
import { IClienteRepository } from "src/cliente/interfaces";
import { UUIDDto } from 'src/common/dtos';

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

    @Put(':id')
    editaUmRegistro(@Param() id: UUIDDto, @Body() data:EditaClienteDto){
        data.id= id.id
        return this.clienteRepository.editaUmRegistro(data)
    }

    //ADICIONADO O EDIT FALTA FAZER OS TRATAMENTOS DE ERRO
 
}