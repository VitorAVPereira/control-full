import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contrato } from 'src/contratos/entities/contrato.entity';
import { Custo } from 'src/custos/entities/custo.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  endereco: string;

  @Column()
  contato: string;

  @OneToMany(() => Contrato, (contrato) => contrato.cliente)
  contratos: Contrato[];

  @OneToMany(() => Custo, (custo) => custo.cliente)
  custos: Custo[];
}
