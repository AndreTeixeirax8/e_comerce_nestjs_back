import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { CriaAtendimentoDto, EditaAtendimentoDto } from 'src/atendimento/dtos';
import { AtendimentoEntity } from 'src/atendimento/entities';

export abstract class IAtendimentoRepository {
  abstract criaUmRegistro: (
    data: CriaAtendimentoDto,
  ) => Promise<CriaAtendimentoDto>;
  abstract buscaTodos: () => Promise<CriaAtendimentoDto[]>;
  abstract editaUmRegistro: (
    data: EditaAtendimentoDto,
  ) => Promise<EditaAtendimentoDto>;
  abstract buscaPaginada: (
    query: PaginateQuery,
  ) => Promise<Paginated<AtendimentoEntity>>;
  abstract buscaTotais: () => Promise<{
    totalAbertos: number;
    totalSolucionados: number;
    maisAntigo: Date;
  }>;
}
