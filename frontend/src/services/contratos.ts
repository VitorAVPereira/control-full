import { Custo, CustoFormData } from "@/types/custo";
import { api } from "./api";
import { Contrato, ContratoFormData } from "@/types/contrato";

export const create = async (data: ContratoFormData) => {
  const response = await api.post<Contrato>("/contratos", data);
  return response.data;
};

export const getContratos = async () => {
  const response = await api.get("/contratos");
  return response.data;
};

export const getById = async (id: number) => {
  const response = await api.get<Contrato>(`/contratos/${id}`);
  return response.data;
};

export const update = async (id: number, data: ContratoFormData) => {
  const response = await api.patch<Contrato>(`/contratos/${id}`, data);
  return response.data;
};

export const deleteContrato = async (id: number) => {
  await api.delete(`/contratos/${id}`);
};

export const addCusto = async (contratoId: number, data: CustoFormData) => {
  const response = await api.post<Custo>(
    `/contratos/${contratoId}/custos`,
    data
  );
  return response.data;
};

export const getCustos = async (contratoId: number) => {
  const response = await api.get<Custo[]>(`/contratos/${contratoId}/custos`);
  return response.data;
};
