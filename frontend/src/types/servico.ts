export interface Servico {
  id: number;
  tipo: string;
  preco_padrao?: number;
}

export type ServicoFormData = Omit<Servico, "id">;
