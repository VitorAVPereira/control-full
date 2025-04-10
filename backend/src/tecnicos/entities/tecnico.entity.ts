import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Custo } from '../../custos/entities/custo.entity';
import { TecnicoServicoCusto } from './tecnico-servico-custo.entity';

@Entity()
export class Tecnico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => TecnicoServicoCusto, (tsc) => tsc.tecnico)
  custosPorServico: TecnicoServicoCusto[];

  @OneToMany(() => Custo, (custo) => custo.tecnico)
  custos: Custo[];
}
