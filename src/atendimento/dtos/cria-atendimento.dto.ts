import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CriaAtendimentoDto{
    
    @IsNotEmpty()
    @IsUUID()
    cliente:string;

    @IsOptional()
    @IsDate()
    dataCriacao: Date;

    @IsOptional()
    @IsString()
    observacoes: string;

    @IsNotEmpty()
    @IsUUID()
    tipo_servico:string;

    @IsNotEmpty()
    @IsUUID()
    atendimento_via:string;

}