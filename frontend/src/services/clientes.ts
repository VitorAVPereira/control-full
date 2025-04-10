import { api } from "./api";
import { ClienteFormData } from "@/types/cliente";

export const getClientes = async () => {
  const response = await api.get("/clientes");
  return response.data;
};

export const getClienteById = async (id: number) => {
  const response = await api.get(`/clientes/${id}`);
  return response.data;
};

export const createCliente = async (data: ClienteFormData) => {
  const response = await api.post("/clientes", data);
  return response.data;
};

export const updateCliente = async (id: number, data: ClienteFormData) => {
  const response = await api.put(`/clientes/${id}`, data);
  return response.data;
};

export const deleteCliente = async (id: number) => {
  const response = await api.delete(`/clientes/${id}`);
  return response.data;
};

export const searchClientes = async (query: string) => {
  const response = await api.get(`/clientes/search`, {
    params: { query },
  });
  return response.data;
};
