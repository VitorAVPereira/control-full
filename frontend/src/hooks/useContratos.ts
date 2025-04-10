import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { create, getContratos, deleteContrato } from "@/services/contratos";
import { ContratoFormData } from "@/types/contrato";
import { useCallback } from "react";

export const useContratos = () => {
  const queryClient = useQueryClient();

  const {
    data: contratos,
    isLoading,
    error: errorGetContratos,
  } = useQuery({
    queryKey: ["contratos"],
    queryFn: getContratos,
    staleTime: 60 * 1000,
  });

  const createMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contratos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteContrato,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contratos"] });
    },
  });

  const newContrato = useCallback(
    (data: ContratoFormData) => createMutation.mutateAsync(data),
    [createMutation]
  );

  const removeContrato = useCallback(
    (id: number) => deleteMutation.mutateAsync(id),
    [deleteMutation]
  );

  return {
    contratos,
    isLoading,
    errorGetContratos,
    newContrato,
    isCreating: createMutation.isPending,
    removeContrato,
  };
};
