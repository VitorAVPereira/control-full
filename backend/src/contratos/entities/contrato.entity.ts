import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Servico } from '../../servicos/entities/servico.entity';
import { Custo } from '../../custos/entities/custo.entity';

@Entity()
export class Contrato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  data_inicio: Date;

  @Column({ type: 'date', nullable: true })
  data_renovacao: Date;

  @Column()
  tipo_servico: 'mensal' | 'unico';

  @Column({ type: 'int' })
  num_placas: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco_cobrado: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.contratos)
  cliente: Cliente;

  @ManyToOne(() => Servico, (servico) => servico.contratos)
  servico: Servico;

  @OneToMany(() => Custo, (custo) => custo.contrato)
  custos: Custo[];
}
