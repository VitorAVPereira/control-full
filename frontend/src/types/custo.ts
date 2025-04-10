import { Cliente } from "./cliente";
import { Contrato } from "./contrato";
import { Servico } from "./servico";
import { Tecnico } from "./tecnico";

export interface Custo {
  id: number;
  tipo: string;
  valor: number;
  cliente: Cliente;
  tecnico?: Tecnico;
  servico?: Servico;
  contrato?: Contrato;
}

export type CustoFormData = {
  tipo: string;
  valor: number;
  clienteId: number;
  tecnicoId?: number;
  servicoId?: number;
  contratoId?: number;
};
