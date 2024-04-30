import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common"
import { IAtendimentoRepository } from "src/atendimento/interfaces"
import { CriaAtendimentoDto, EditaAtendimentoDto } from "src/atendimento/dtos"
import { UUIDDto } from "src/common/dtos"

@Controller('atendimento')
export class AtendimentoController{
    constructor(
        private readonly atendimentoRepository:IAtendimentoRepository
    ){}


    @Post()
    criaUmRegistro(@Body() data:CriaAtendimentoDto){
      return this.atendimentoRepository.criaUmRegistro(data)
    }

    @Get()
    buscaTodosRRegistros(){
        return this.atendimentoRepository.buscaTodos()
    }

    @Put(':id')
    editaUmRegistro(@Param() id: UUIDDto, @Body() data:EditaAtendimentoDto){
        data.id= id.id
        return this.atendimentoRepository.editaUmRegistro(data)
    }
}
    //ADICIONADO O EDIT FALTA FAZER OS TRATAMENTOS DE ERRO