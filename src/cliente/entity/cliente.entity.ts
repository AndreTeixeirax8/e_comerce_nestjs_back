import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('cliente')
export class ClienteEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column({ type: 'varchar', length: 150, nullable: true})
    nome:string;

    @Column({ type: 'varchar', length: 25, nullable: true})//aceita null
    cpf:string

    @Column({ type: 'varchar', length: 25, nullable: true})
    cnpj:string

    @Column({ type: 'varchar', length: 100, nullable: true})
    email:string
}

   
