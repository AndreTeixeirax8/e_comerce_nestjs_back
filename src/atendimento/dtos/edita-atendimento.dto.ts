import { IsNotEmpty, IsUUID } from "class-validator";
import { CriaAtendimentoDto } from "src/atendimento/dtos";

export class EditaAtendimentoDto extends CriaAtendimentoDto{
    @IsNotEmpty()
    @IsUUID()
    id:string
}