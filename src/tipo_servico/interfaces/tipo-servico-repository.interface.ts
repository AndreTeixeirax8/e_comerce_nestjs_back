import { CriaTipoServicoDto, EditaTipoServicoDto } from 'src/tipo_servico/dtos';

export abstract class ITipoServicoRepository {
  criaUmRegistro: (data: CriaTipoServicoDto) => Promise<CriaTipoServicoDto>;
  buscaTodos: () => Promise<CriaTipoServicoDto[]>;
  editaUmRegistro: (data: EditaTipoServicoDto) => Promise<EditaTipoServicoDto>;
  buscaUmPorId: (id: string) => Promise<CriaTipoServicoDto>;
}
