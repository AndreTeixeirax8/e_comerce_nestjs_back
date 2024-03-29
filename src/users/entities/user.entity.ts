import { RolesEnum } from "src/auth/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column('text')
    username:string;

    @Column('text')
    password:string

    @Column('text')
    roles:RolesEnum
}
