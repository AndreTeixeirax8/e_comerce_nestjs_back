import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guards";
import { RolesEnum } from "src/auth/role.enum";
import { Roles } from "src/auth/roles.decorator";
import { CriaClienteDto, EditaClienteDto } from "src/cliente/dtos";
import { IClienteRepository } from "src/cliente/interfaces";
import { UUIDDto } from 'src/common/dtos';
import { ClienteEntity } from "src/cliente/entities";


@UseGuards(JwtAuthGuard)
@Roles(RolesEnum.Admin)
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

    
    @Get(':id')
    buscaUmPorId(@Param('id') id: string) {
      return this.clienteRepository.buscaUmPorId(id);
    }


    @Get('buscar/nome')
    async buscarClientesPorNome(@Query('nome') nome: string): Promise<ClienteEntity[]> {
        console.log("inicia a busca")
        console.log(nome)
      return await this.clienteRepository.buscaPorNomeParcial(nome);
    }
 
}