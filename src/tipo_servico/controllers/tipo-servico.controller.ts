import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesEnum } from 'src/auth';
import { ITipoServicoRepository } from 'src/tipo_servico/interfaces';
import { CriaTipoServicoDto, EditaTipoServicoDto } from 'src/tipo_servico/dtos';
import { UUIDDto } from 'src/common/dtos';

@UseGuards(JwtAuthGuard)
@Roles(RolesEnum.Admin)
@Controller('tipo-servico')
export class TipoServicoController {
  constructor(private readonly tipoServicoRepository: ITipoServicoRepository) {}

  @Post()
  criaUmRegistro(@Body() data: CriaTipoServicoDto) {
    return this.tipoServicoRepository.criaUmRegistro(data);
  }

  @Get()
  buscaTodosRegistros() {
    return this.tipoServicoRepository.buscaTodos();
  }

  @Put(':id')
  editaUmRegistro(@Param() id: UUIDDto, @Body() data: EditaTipoServicoDto) {
    data.id = id.id;
    return this.tipoServicoRepository.editaUmRegistro(data);
  }

  @Get(':id')
  buscaUmPorId(@Param('id') id: string) {
    return this.tipoServicoRepository.buscaUmPorId(id);
  }
}
