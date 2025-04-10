import { Servico } from "./servico";

export interface Tecnico {
  id: number;
  nome: string;
  custosPorServico: TecnicoServicoCusto[];
}

export interface TecnicoServicoCusto {
  id: number;
  custo: number;
  servico: Servico;
  tecnico: Tecnico;
}

export type TecnicoFormData = {
  nome: string;
  custosPorServico: {
    servicoId: number;
    custo: number;
  }[];
};
