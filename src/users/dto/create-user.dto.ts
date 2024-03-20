import { IsString } from "class-validator";
import { Column, Entity } from "typeorm";


export class CreateUserDto {
    @IsString()
    username:string;

    @IsString()
    password:string
}
