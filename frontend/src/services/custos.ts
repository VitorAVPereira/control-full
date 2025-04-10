import { api } from "./api";
import { Custo, CustoFormData } from "@/types/custo";

export const CustoService = {
  create: async (data: CustoFormData) => {
    const response = await api.post<Custo>("/custos", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get<Custo[]>("/custos");
    return response.data;
  },

  getByCliente: async (clienteId: number) => {
    const response = await api.get<Custo[]>(`/clientes/${clienteId}/custos`);
    return response.data;
  },

  getByContrato: async (contratoId: number) => {
    const response = await api.get<Custo[]>(`/contratos/${contratoId}/custos`);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/custos/${id}`);
  },
};
