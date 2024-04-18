import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CriaClienteDto{
    
    @IsNotEmpty()
    @IsString()
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