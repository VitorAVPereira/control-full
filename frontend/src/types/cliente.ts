import { Contrato } from "./contrato";
import { Custo } from "./custo";

export interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
  endereco: string;
  contato: string;
  contratos?: Contrato[];
  custos?: Custo[];
}

export type ClienteFormData = Omit<Cliente, "id">;
