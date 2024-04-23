import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CriaClienteDto{
    
    @IsNotEmpty()
    @IsUUID()
    nome:string;

    @IsOptional()
    @IsString()
    cpf:string

    @IsOptional()
    @IsString()
    cnpj:string

    @IsOptional()
    @IsString()
    email:string
}