import { OrigemAtendimentoEntity } from 'src/origem_atendimento/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('atendimento')
export class AtendimentoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  cliente: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  @Column('text', { nullable: true })
  observacoes: string;

  @Column({ type: 'uuid' })
  tipo_servico: string;

  @Column({ type: 'uuid' })
  atendimento_via: string;

  @Column({ type: 'varchar', length: 35, nullable: true })
  status: string;

  @ManyToOne(() => OrigemAtendimentoEntity)
  @JoinColumn([{ name: 'atendimento_via', referencedColumnName: 'id' }])
  origem_atendimento: OrigemAtendimentoEntity;
}
