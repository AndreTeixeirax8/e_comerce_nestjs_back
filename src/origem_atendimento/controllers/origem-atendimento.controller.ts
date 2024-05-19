import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard, Roles, RolesEnum } from "src/auth";
import { IOrigemAtendimentoRepository } from "src/origem_atendimento/interfaces";
import { CriaOrigemAtendimentoDto, EditaOrigemAtendimentoDto } from "src/origem_atendimento/dtos";
import { UUIDDto } from "src/common/dtos";

@UseGuards(JwtAuthGuard)
@Roles(RolesEnum.Admin)
@Controller('origem_atendimento')
export class ClienteController{
    constructor(
        private readonly origemAtendimentoRepository:IOrigemAtendimentoRepository
    ){}

    @Post()
    criaUmRegistro(@Body() data:CriaOrigemAtendimentoDto){
      return this.origemAtendimentoRepository.criaUmRegistro(data)
    }

    @Get()
    buscaTodosRRegistros(){
        return this.origemAtendimentoRepository.buscaTodos()
    }

    @Put(':id')
    editaUmRegistro(@Param() id: UUIDDto, @Body() data:EditaOrigemAtendimentoDto){
        data.id= id.id
        return this.origemAtendimentoRepository.editaUmRegistro(data)
    }

    
    @Get(':id')
    buscaUmPorId(@Param('id') id: string) {
      return this.origemAtendimentoRepository.buscaUmPorId(id);
    }


  
    }