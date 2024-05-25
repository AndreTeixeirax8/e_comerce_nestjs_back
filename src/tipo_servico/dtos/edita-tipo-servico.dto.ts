import { IsNotEmpty, IsUUID } from 'class-validator';
import { CriaTipoServicoDto } from 'src/tipo_servico/dtos';

export class EditaTipoServicoDto extends CriaTipoServicoDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
