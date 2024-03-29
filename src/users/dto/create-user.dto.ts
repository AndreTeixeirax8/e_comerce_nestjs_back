import { IsString } from "class-validator";
import { RolesEnum } from "src/auth/role.enum";
import { Column, Entity } from "typeorm";


export class CreateUserDto {
    @IsString()
    username:string;

    @IsString()
    password:string

    @IsString()
    roles:RolesEnum
}
