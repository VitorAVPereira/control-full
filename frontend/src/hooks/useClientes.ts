import { useCallback } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  createCliente,
  deleteCliente,
  getClientes,
} from "@/services/clientes";
import { ClienteFormData } from "@/types/cliente";

export const useClientes = () => {
  const queryClient = useQueryClient();

  const {
    data: clientes,
    isLoading: isLoadingClientes,
    error: errorGetClientes,
  } = useQuery({
    queryKey: ["clientes"],
    queryFn: getClientes,
    staleTime: 60 * 1000,
  });

  const createMutation = useMutation({
    mutationFn: createCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });

   const newCliente = useCallback(
    (data: ClienteFormData) => createMutation.mutateAsync(data),
    [createMutation]
  );

  const removeCliente = useCallback(
    (id: number) => deleteMutation.mutateAsync(id),
    [deleteMutation]
  );

  return {
    clientes,
    isLoadingClientes,
    errorGetClientes,
    newCliente,
    isCreating: createMutation.isPending,
    errorCreate: createMutation.error,
    removeCliente,
    isDeleting: deleteMutation.isPending,
    errorDelete: deleteMutation.error,
  };
};
