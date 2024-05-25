import { IsNotEmpty, IsString } from 'class-validator';

export class CriaTipoServicoDto {
  @IsNotEmpty()
  @IsString()
  nome_servico: string;
}
