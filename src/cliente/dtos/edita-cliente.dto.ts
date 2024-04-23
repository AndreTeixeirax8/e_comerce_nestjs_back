import { IsNotEmpty, IsUUID } from "class-validator";
import { CriaClienteDto } from "src/cliente/dtos";

export class EditaClienteDto extends CriaClienteDto{

    @IsNotEmpty()
    @IsUUID()
    id:string
}