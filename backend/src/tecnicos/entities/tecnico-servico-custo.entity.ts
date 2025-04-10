import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tecnico } from './tecnico.entity';
import { Servico } from 'src/servicos/entities/servico.entity';

@Entity()
export class TecnicoServicoCusto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  custo: number;

  @ManyToOne(() => Tecnico, (tecnico) => tecnico.custosPorServico)
  tecnico: Tecnico;

  @ManyToOne(() => Servico, (servico) => servico.custosTecnicos)
  servico: Servico;
}
