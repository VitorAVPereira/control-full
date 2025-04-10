'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ServicoFormData } from '@/types/servico'

const clienteSchema = z.object({
    tipo: z.string().min(1, { message: 'tipo é obrigatório' }),
    preco_padrao: z.number().min(0.01, "Valor inválido"),
})

type ServicoFormProps = {
    onSubmit: (data: ServicoFormData) => void,
    isSubmitting?: boolean,
}
export function ServicoForm({ onSubmit, isSubmitting }: ServicoFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(clienteSchema),
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
                <Input placeholder='Serviço' {...register('tipo')} />
                {errors.tipo && <span>{errors.tipo.message}</span>}
            </div>
            <div>
                <Input placeholder='Preço padrão' {...register('preco_padrao')} />
                {errors.preco_padrao && <span>{errors.preco_padrao.message}</span>}
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Criando...' : 'Criar serviço'}
            </Button>
        </form>
    )
}