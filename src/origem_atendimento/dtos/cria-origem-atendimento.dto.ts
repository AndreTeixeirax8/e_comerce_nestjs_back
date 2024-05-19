import { IsNotEmpty, IsString } from "class-validator";

export class CriaOrigemAtendimentoDto{
    @IsNotEmpty()
    @IsString()
    nome_antendimento:string;
}