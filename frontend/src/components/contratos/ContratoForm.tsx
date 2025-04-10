'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { useClientes } from '@/hooks/useClientes'
import { useServicos } from '@/hooks/useServicos'
import { useTecnicos } from '@/hooks/useTecnicos'
import { Cliente } from '@/types/cliente'
import { Servico } from '@/types/servico'
import { Tecnico } from '@/types/tecnico'
import { ContratoFormData } from '@/types/contrato'
import { Label } from '../ui/label'

const contratoSchema = z.object({
    clienteId: z.number().min(1),
    servicoId: z.number().min(1),
    tecnicoId: z.number().optional(),
    data_inicio: z.string(),
    data_renovacao: z.string().optional(),
    num_placas: z.string().transform((v) => Number(v)||0),
    tipo_servico: z.enum(['mensal', 'unico']).default('unico'),
    preco_cobrado: z.string().transform((v) => Number(v)||0),
})

type FormProps = {
    onSubmit: (data: ContratoFormData) => void,
    isSubmitting?: boolean,
}

export function ContratoForm({ onSubmit, isSubmitting }: FormProps) {
    const { clientes } = useClientes()
    const { servicos } = useServicos()
    const { tecnicos } = useTecnicos()

    const { register, control, handleSubmit, formState } = useForm({
        resolver: zodResolver(contratoSchema)
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
                name="clienteId"
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value?.toString()}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione o cliente" />
                        </SelectTrigger>
                        <SelectContent>
                            {clientes?.map((cliente: Cliente) => (
                                <SelectItem key={cliente.id} value={cliente.id.toString()}>
                                    {cliente.nome}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />

            <Controller
                name="servicoId"
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value?.toString()}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione o serviço" />
                        </SelectTrigger>
                        <SelectContent>
                            {servicos?.map((servico: Servico) => (
                                <SelectItem key={servico.id} value={servico.id.toString()}>
                                    {servico.tipo}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            <Controller
                name="tecnicoId"
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value?.toString()}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione o técnico" />
                        </SelectTrigger>
                        <SelectContent>
                            {tecnicos?.map((tecnico: Tecnico) => (
                                <SelectItem key={tecnico.id} value={tecnico.id.toString()}>
                                    {tecnico.nome}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            <Label htmlFor="data_inicio">Data de Início</Label>
            <Input
                placeholder="Data de Início"
                {...register('data_inicio')}
            />
            {formState.errors.data_inicio && (
                <span className="text-red-500">
                    {formState.errors.data_inicio.message}
                </span>
            )}
            <Label htmlFor="data_renovacao">Data de Renovação (opcional)</Label>
            <Input
                placeholder="Data de Renovação"
                {...register('data_renovacao')}
            />
            {formState.errors.data_renovacao && (
                <span className="text-red-500">
                    {formState.errors.data_renovacao.message}
                </span>
            )}
            <Input
                placeholder="Número de Placas"
                {...register('num_placas')}
            />
            {formState.errors.num_placas && (
                <span className="text-red-500">
                    {formState.errors.num_placas.message}
                </span>
            )}
            <Input
                placeholder="Preço Cobrado"
                {...register('preco_cobrado')}
            />
            {formState.errors.preco_cobrado && (
                <span className="text-red-500">
                    {formState.errors.preco_cobrado.message}
                </span>
            )}
            <Select
                onValueChange={(value) => {
                    register('tipo_servico').onChange(value as any)
                }
                }
                defaultValue="unico"
            >
                <SelectTrigger>
                    <SelectValue placeholder="Tipo de Serviço" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="unico">Único</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                </SelectContent>
            </Select>
            {formState.errors.tipo_servico && (
                <span className="text-red-500">
                    {formState.errors.tipo_servico.message}
                </span>
            )}

            < Button type="submit" disabled={isSubmitting} >
                {isSubmitting ? 'Salvando...' : 'Criar Contrato'}
            </Button>
        </form >
    )
}