import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tecnico } from 'src/tecnicos/entities/tecnico.entity';
import { Servico } from 'src/servicos/entities/servico.entity';
import { Contrato } from 'src/contratos/entities/contrato.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Entity()
export class Custo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string; // Ex: "Viagem", "Peças", "Horas Extras"

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  // Relação com o cliente (N custos → 1 cliente)
  @ManyToOne(() => Cliente, (cliente) => cliente.custos)
  cliente: Cliente;

  // Relação com o técnico (opcional: N custos → 1 técnico)
  @ManyToOne(() => Tecnico, (tecnico) => tecnico.custos, { nullable: true })
  tecnico?: Tecnico;

  // Relação com o serviço (opcional: N custos → 1 serviço)
  @ManyToOne(() => Servico, (servico) => servico.custos, { nullable: true })
  servico?: Servico;

  // Relação com o contrato (opcional: N custos → 1 contrato)
  @ManyToOne(() => Contrato, (contrato) => contrato.custos, { nullable: true })
  contrato?: Contrato;
}
