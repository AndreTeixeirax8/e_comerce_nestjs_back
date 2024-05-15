import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guards";
import { RolesEnum } from "src/auth/role.enum";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
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

    //@Roles(RolesEnum.Admin)
    //@UseGuards(JwtAuthGuard,RolesGuard)
    @Get(':id')
    buscaUmPorId(@Param('id') id: string) {
        console.log("chegou na controller com o id")
        console.log(id)
      return this.clienteRepository.buscaUmPorId(id);
    }
 
}