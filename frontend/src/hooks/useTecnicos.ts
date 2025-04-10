import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TecnicoService } from "@/services/tecnicos";
import { TecnicoFormData } from "@/types/tecnico";

export const useTecnicos = () => {
  const queryClient = useQueryClient();

  const tecnicosQuery = useQuery({
    queryKey: ["tecnicos"],
    queryFn: TecnicoService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: TecnicoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tecnicos"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TecnicoFormData }) =>
      TecnicoService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tecnicos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: TecnicoService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tecnicos"] });
    },
  });

  return {
    tecnicos: tecnicosQuery.data,
    isLoading: tecnicosQuery.isLoading,
    createTecnico: createMutation.mutateAsync,
    updateTecnico: updateMutation.mutateAsync,
    deleteTecnico: deleteMutation.mutateAsync,
  };
};
