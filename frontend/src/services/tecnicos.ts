import { api } from "./api";
import { Tecnico, TecnicoFormData, TecnicoServicoCusto } from "@/types/tecnico";

export const TecnicoService = {
  create: async (data: TecnicoFormData) => {
    const response = await api.post<Tecnico>("/tecnicos", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get<Tecnico[]>("/tecnicos");
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Tecnico>(`/tecnicos/${id}`);
    return response.data;
  },

  update: async (id: number, data: TecnicoFormData) => {
    const response = await api.patch<Tecnico>(`/tecnicos/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/tecnicos/${id}`);
  },

  getCustosServico: async (tecnicoId: number) => {
    const response = await api.get<TecnicoServicoCusto[]>(
      `/tecnicos/${tecnicoId}/servicos`
    );
    return response.data;
  },
};
