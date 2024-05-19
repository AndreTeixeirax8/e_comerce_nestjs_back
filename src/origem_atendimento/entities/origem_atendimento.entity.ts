import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('origem_atendimento')
export class OrigemAtendimentoEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column({ type: 'varchar', length: 100, nullable: true})
    nome_antendimento:string;

}