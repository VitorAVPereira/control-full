'use client'

import { useRouter } from "next/navigation"
import { toast } from 'sonner'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ServicoFormData } from "@/types/servico"
import { useServicos } from "@/hooks/useServicos"
import { ServicoForm } from "@/components/servicos/ServicoForm"

export default function NovoClientePage() {
    const router = useRouter()
    const { newServico, isCreating } = useServicos()

    const handleCreateServico = async (data: ServicoFormData) => {
        console.log(data)
        try {
            await newServico(data)
            toast.success("Serviço criado com sucesso")
            router.push("/servicos")
        } catch (error) {
            console.log(error)
            toast.error("Erro ao criar serviço")
        }
    }

    return (
        <div className="container max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Novo Serviço</CardTitle>
                </CardHeader>
                <CardContent>
                    <ServicoForm onSubmit={handleCreateServico} isSubmitting={isCreating} />
                </CardContent>
            </Card>
        </div>
    )
}