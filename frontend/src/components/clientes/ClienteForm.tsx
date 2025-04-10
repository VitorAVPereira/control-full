'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ClienteFormData } from '@/types/cliente'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const clienteSchema = z.object({
    nome: z.string().min(1, { message: 'Nome é obrigatório' }),
    contato: z.string().min(7, { message: 'Contato é obrigatório' }),
    cnpj: z.string().min(14, { message: 'CNPJ é obrigatório' }),
    endereco: z.string().min(5, { message: 'Endereço é obrigatório' }),
})

type ClienteFormProps = {
    onSubmit: (data: ClienteFormData) => void,
    isSubmitting?: boolean,
}
export function ClienteForm({ onSubmit, isSubmitting }: ClienteFormProps) {
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
                <Input placeholder='Nome' {...register('nome')} />
                {errors.nome && <span>{errors.nome.message}</span>}
            </div>
            <div>
                <Input placeholder='CNPJ' {...register('cnpj')} />
                {errors.cnpj && <span>{errors.cnpj.message}</span>}
            </div>
            <div>
                <Input placeholder='Endereço' {...register('endereco')} />
                {errors.contato && <span>{errors.contato.message}</span>}
            </div>
            <div>
                <Input placeholder='Contato' {...register('contato')} />
                {errors.contato && <span>{errors.contato.message}</span>}
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Criando...' : 'Criar Cliente'}
            </Button>
        </form>
    )
}