import { useCallback } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getServicos, createServico, deleteServico } from "@/services/servicos";
import { ServicoFormData } from "@/types/servico";

export const useServicos = () => {
  const queryClient = useQueryClient();

  const {
    data: servicos,
    isLoading: isLoadingServicos,
    error: errorGetServicos,
  } = useQuery({
    queryKey: ["servicos"],
    queryFn: getServicos,
    staleTime: 60 * 1000,
  });

  const createMutation = useMutation({
    mutationFn: createServico,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servicos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteServico,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servicos"] });
    },
  });

  const newServico = useCallback(
    (data: ServicoFormData) => createMutation.mutateAsync(data),
    [createMutation]
  );

  const removeServico = useCallback(
    (id: number) => deleteMutation.mutateAsync(id),
    [deleteMutation]
  );

  return {
    servicos,
    isLoadingServicos,
    errorGetServicos,
    newServico,
    isCreating: createMutation.isPending,
    errorCreate: createMutation.error,
    removeServico,
    isDeleting: deleteMutation.isPending,
    errorDelete: deleteMutation.error,
  };
};
