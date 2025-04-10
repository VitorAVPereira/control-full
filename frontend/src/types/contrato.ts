import { Cliente } from "./cliente";
import { Custo } from "./custo";
import { Servico } from "./servico";
import { Tecnico } from "./tecnico";

export interface Contrato {
  id: number;
  data_inicio: Date;
  data_renovacao?: Date;
  tipo_servico: "mensal" | "unico";
  num_placas: number;
  preco_cobrado: number;
  cliente: Cliente;
  servico: Servico;
  tecnico?: Tecnico;
  custos?: Custo[];
}

export type ContratoFormData = {
  data_inicio: string;
  data_renovacao?: string;
  tipo_servico: "mensal" | "unico";
  num_placas: number;
  preco_cobrado: number;
  clienteId: number;
  servicoId: number;
  tecnicoId?: number;
};
