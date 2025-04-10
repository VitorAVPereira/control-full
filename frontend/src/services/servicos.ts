import { api } from "./api";
import { ServicoFormData } from "@/types/servico";

export const getServicos = async () => {
  const response = await api.get("/servicos");
  return response.data;
};

export const getServicoById = async (id: number) => {
  const response = await api.get(`/servicos/${id}`);
  return response.data;
};

export const createServico = async (data: ServicoFormData) => {
  const response = await api.post("/servicos", data);
  return response.data;
};

export const updateServico = async (id: number, data: ServicoFormData) => {
  const response = await api.put(`/servicos/${id}`, data);
  return response.data;
};

export const deleteServico = async (id: number) => {
  const response = await api.delete(`/servicos/${id}`);
  return response.data;
};

export const searchServicos = async (query: string) => {
  const response = await api.get(`/servicos/search`, {
    params: { query },
  });
  return response.data;
};
