import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column('text')
    username:string;

    @Column('text')
    password:string
}
