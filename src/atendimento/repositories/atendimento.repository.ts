import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AtendimentoEntity } from 'src/atendimento/entities';
import { Repository } from 'typeorm';
import { EditaAtendimentoDto, CriaAtendimentoDto } from 'src/atendimento/dtos';
import { IAtendimentoRepository } from 'src/atendimento/interfaces';
import { StatusEnum } from 'src/atendimento/enums';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class AtendimentoRepository implements IAtendimentoRepository {
  constructor(
    @InjectRepository(AtendimentoEntity)
    private atendimentoRepository: Repository<AtendimentoEntity>,
  ) {}

  criaUmRegistro(data: CriaAtendimentoDto): Promise<CriaAtendimentoDto> {
    data.status = StatusEnum.ABERTO;
    return this.atendimentoRepository.save(data);
  }

  buscaTodos(): Promise<CriaAtendimentoDto[]> {
    return this.atendimentoRepository.find();
  }

  editaUmRegistro(data: EditaAtendimentoDto): Promise<EditaAtendimentoDto> {
    return this.atendimentoRepository.save(data);
  }

  buscaPaginada(query: PaginateQuery): Promise<Paginated<AtendimentoEntity>> {
    const queryBuilder = this.atendimentoRepository
      .createQueryBuilder('atendimento')
      .leftJoinAndSelect(
        'atendimento.origem_atendimento',
        'origem_atendimento',
      );
    return paginate(query, queryBuilder, {
      sortableColumns: ['cliente'],
      relations: ['origem_atendimento'],
      nullSort: 'last',
      searchableColumns: ['cliente'],
      defaultSortBy: [['cliente', 'ASC']],
      defaultLimit: 10,
      filterableColumns: {
        arquivado: [FilterOperator.EQ],
      },
    });
  }
}
