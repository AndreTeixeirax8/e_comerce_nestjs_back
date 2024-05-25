import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoServicoEntity } from 'src/tipo_servico/entities';
import { Repository } from 'typeorm';
import { CriaTipoServicoDto, EditaTipoServicoDto } from 'src/tipo_servico/dtos';
import { ITipoServicoRepository } from 'src/tipo_servico/interfaces';

@Injectable()
export class TipoServicoRepository implements ITipoServicoRepository {
  constructor(
    @InjectRepository(TipoServicoEntity)
    private tipoServicoRepository: Repository<TipoServicoEntity>,
  ) {}

  criaUmRegistro(data: CriaTipoServicoDto): Promise<CriaTipoServicoDto> {
    return this.tipoServicoRepository.save(data);
  }

  buscaTodos(): Promise<CriaTipoServicoDto[]> {
    return this.tipoServicoRepository.find();
  }

  editaUmRegistro(data: EditaTipoServicoDto): Promise<EditaTipoServicoDto> {
    return this.tipoServicoRepository.save(data);
  }

  buscaUmPorId(id: string): Promise<CriaTipoServicoDto> {
    return this.tipoServicoRepository.findOneBy({ id });
  }
}
