import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo_servico')
export class TipoServicoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nome_servico: string;
}
