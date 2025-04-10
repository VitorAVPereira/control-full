'use client'

import { ClienteForm } from "@/components/clientes/ClienteForm"
import { useClientes } from "@/hooks/useClientes"
import { useRouter } from "next/navigation"
import { toast } from 'sonner'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ClienteFormData } from "@/types/cliente"

export default function NovoClientePage() {
    const router = useRouter()
    const { newCliente, isCreating } = useClientes()

    const handleCreateCliente = async (data: ClienteFormData) => {
        console.log(data)
        try {
            await newCliente(data)
            toast.success("Cliente criado com sucesso")
            router.push("/clientes")
        } catch (error) {
            console.log(error)
            toast.error("Erro ao criar cliente")
        }
    }

    return (
        <div className="container max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Novo Cliente</CardTitle>
                </CardHeader>
                <CardContent>
                    <ClienteForm onSubmit={handleCreateCliente} isSubmitting={isCreating} />
                </CardContent>
            </Card>
        </div>
    )
}