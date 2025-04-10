import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CustoService } from '@/services/custos';

export const useCustos = (clienteId?: number, contratoId?: number) => {
  const queryClient = useQueryClient();

  const custosQuery = useQuery({
    queryKey: ['custos', clienteId, contratoId],
    queryFn: () => {
      if (contratoId) return CustoService.getByContrato(contratoId);
      if (clienteId) return CustoService.getByCliente(clienteId);
      return CustoService.getAll();
    },
  });

  const createMutation = useMutation({
    mutationFn: CustoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custos'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: CustoService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custos'] });
    },
  });

  return {
    custos: custosQuery.data,
    isLoading: custosQuery.isLoading,
    createCusto: createMutation.mutateAsync,
    deleteCusto: deleteMutation.mutateAsync,
  };
};