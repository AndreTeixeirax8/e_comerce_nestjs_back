import { IsNotEmpty, IsUUID } from "class-validator";
import { CriaOrigemAtendimentoDto } from "src/origem_atendimento/dtos";

export class EditaOrigemAtendimentoDto extends CriaOrigemAtendimentoDto{
    @IsNotEmpty()
    @IsUUID()
    id:string
}