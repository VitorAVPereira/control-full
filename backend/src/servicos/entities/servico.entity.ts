import { Contrato } from 'src/contratos/entities/contrato.entity';
import { Custo } from 'src/custos/entities/custo.entity';
import { TecnicoServicoCusto } from 'src/tecnicos/entities/tecnico-servico-custo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco_padrao: number;

  @OneToMany(() => TecnicoServicoCusto, (tsc) => tsc.servico)
  custosTecnicos: TecnicoServicoCusto[];

  @OneToMany(() => Contrato, (contrato) => contrato.servico)
  contratos: Contrato[];

  @OneToMany(() => Custo, (custo) => custo.servico)
  custos: Custo[];
}
