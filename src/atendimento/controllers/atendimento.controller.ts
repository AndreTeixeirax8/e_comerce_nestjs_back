import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { IAtendimentoRepository } from 'src/atendimento/interfaces';
import { CriaAtendimentoDto, EditaAtendimentoDto } from 'src/atendimento/dtos';
import { UUIDDto } from 'src/common/dtos';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { AtendimentoEntity } from '../entities';

@Controller('atendimento')
export class AtendimentoController {
  constructor(private readonly atendimentoRepository: IAtendimentoRepository) {}

  @Post()
  criaUmRegistro(@Body() data: CriaAtendimentoDto) {
    return this.atendimentoRepository.criaUmRegistro(data);
  }

  @Get()
  buscaTodosRegistros() {
    return this.atendimentoRepository.buscaTodos();
  }

  @Put(':id')
  editaUmRegistro(@Param() id: UUIDDto, @Body() data: EditaAtendimentoDto) {
    data.id = id.id;
    return this.atendimentoRepository.editaUmRegistro(data);
  }

  @Get('paginada')
  buscaPaginada(
    @Query() query: PaginateQuery,
  ): Promise<Paginated<AtendimentoEntity>> {
    return this.atendimentoRepository.buscaPaginada(query);
  }
}
