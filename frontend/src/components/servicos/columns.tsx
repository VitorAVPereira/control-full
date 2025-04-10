'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Cliente } from "@/types/cliente"
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
): ColumnDef<Cliente>[] => [
        {
            accessorKey: "tipo",
            header: "Tipo",
        },
        {
            accessorKey: "preco_padrao",
            header: "Preço padrão (R$)",
            cell: ({ row }) => (row.getValue("preco_padrao") as number).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
        },
        {
            id: "acoes",
            cell: ({ row }) => {
                const cliente = row.original

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
                                <Link href={`/clientes/${cliente.id}`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDelete(cliente.id)}
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
