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
      .leftJoinAndSelect('atendimento.origem_atendimento', 'origem_atendimento')
      .leftJoinAndSelect(
        'atendimento.tipo_servico_entity',
        'tipo_servico_entity',
      )
      .leftJoinAndSelect('atendimento.cliente_entity', 'cliente_entity')
      .where('atendimento.status != :status', { status: 'solucionado' });
    return paginate(query, queryBuilder, {
      sortableColumns: ['cliente'],
      nullSort: 'last',
      searchableColumns: ['cliente'],
      defaultSortBy: [['dataCriacao', 'ASC']],
      defaultLimit: 5,
      filterableColumns: {
        arquivado: [FilterOperator.EQ],
      },
    });
  }

  /*
  async buscaTotais(): Promise<{
    totalAbertos: number;
    totalSolucionados: number;
    maisAntigo: Date;
  }> {
    const queryBuilder =
      this.atendimentoRepository.createQueryBuilder('atendimento');

    const [totalAbertos, totalSolucionados, maisAntigo] = await Promise.all([
      queryBuilder
        .where('atendimento.status = :status', { status: 'aberto' })
        .getCount(),
      queryBuilder
        .where('atendimento.status = :status', { status: 'solucionado' })
        .getCount(),
      queryBuilder
        .where('atendimento.status = :status', { status: 'aberto' })
        .orderBy('atendimento.dataCriacao', 'ASC')
        .getOne()
        .then((atendimento) => (atendimento ? atendimento.dataCriacao : null)),
    ]);

    return {
      totalAbertos,
      totalSolucionados,
      maisAntigo,
    };
  }*/

  async buscaTotais(): Promise<{
    totalAbertos: number;
    totalSolucionados: number;
    maisAntigo: Date | null;
    totalPorTipoServico: { [key: string]: number };
    totalPorOrigemAtendimento: { [key: string]: number };
  }> {
    const queryBuilder = this.atendimentoRepository
      .createQueryBuilder('atendimento')
      .leftJoinAndSelect('atendimento.origem_atendimento', 'origem_atendimento')
      .leftJoinAndSelect(
        'atendimento.tipo_servico_entity',
        'tipo_servico_entity',
      );

    const [
      totalAbertos,
      totalSolucionados,
      totalPorTipoServico,
      totalPorOrigemAtendimento,
    ] = await Promise.all([
      queryBuilder
        .where('atendimento.status = :status', { status: 'aberto' })
        .getCount(),
      queryBuilder
        .where('atendimento.status = :status', { status: 'solucionado' })
        .getCount(),
      queryBuilder
        .where('atendimento.status = :status', { status: 'aberto' })
        .groupBy('tipo_servico_entity.nome_servico')
        .select('tipo_servico_entity.nome_servico, COUNT(*) AS total')
        .getRawMany()
        .then((result) =>
          result.reduce((acc, curr) => {
            acc[curr.nome_servico] = curr.total;
            return acc;
          }, {}),
        ),
      queryBuilder
        .where('atendimento.status = :status', { status: 'aberto' })
        .groupBy('origem_atendimento.nome_antendimento')
        .select('origem_atendimento.nome_antendimento, COUNT(*) AS total')
        .getRawMany()
        .then((result) =>
          result.reduce((acc, curr) => {
            acc[curr.nome_antendimento] = curr.total;
            return acc;
          }, {}),
        ),
    ]);

    const maisAntigo = await this.atendimentoRepository
      .createQueryBuilder('atendimento')
      .where('atendimento.status = :status', { status: 'aberto' })
      .orderBy('atendimento.dataCriacao', 'ASC')
      .getOne()
      .then((atendimento) => (atendimento ? atendimento.dataCriacao : null));

    return {
      totalAbertos,
      totalSolucionados,
      maisAntigo,
      totalPorTipoServico,
      totalPorOrigemAtendimento,
    };
  }
}
