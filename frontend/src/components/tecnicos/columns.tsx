'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Tecnico } from "@/types/tecnico"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const createColumns = (
    handleDelete: (id: number) => Promise<void>
): ColumnDef<Tecnico>[] => [
        {
            accessorKey: "nome",
            header: "Nome",
        },
        {
            accessorKey: "custosPorServico",
            header: "Serviços/Custos",
            cell: ({ row }) => (
                <div className="space-y-1">
                    {row.original.custosPorServico?.map((custo) => (
                        <div key={custo.id}>
                            {custo.servico.tipo}: R$ {custo.custo.toFixed(2)}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            id: "acoes",
            cell: ({ row }) => {
                const tecnico = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link href={`/tecnicos/${tecnico.id}`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDelete(tecnico.id)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]