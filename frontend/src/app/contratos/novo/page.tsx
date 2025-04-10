'use client'

import { useRouter } from "next/navigation"
import { toast } from 'sonner'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useContratos } from "@/hooks/useContratos"
import { ContratoFormData } from "@/types/contrato"
import { ContratoForm } from "@/components/contratos/ContratoForm"

export default function NovoContratoPage() {
    const router = useRouter()
    const { newContrato, isCreating } = useContratos()

    const handleCreateServico = async (data: ContratoFormData) => {
        try {
            await newContrato(data)
            toast.success("Contrato criado com sucesso")
            router.push("/contratos")
        } catch (error) {
            console.log(error)
            toast.error("Erro ao criar contrato")
        }
    }

    return (
        <div className="container max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Novo Contrato</CardTitle>
                </CardHeader>
                <CardContent>
                    <ContratoForm onSubmit={handleCreateServico} isSubmitting={isCreating} />
                </CardContent>
            </Card>
        </div>
    )
}