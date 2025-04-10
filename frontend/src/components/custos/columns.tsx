'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Custo } from "@/types/custo"
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
): ColumnDef<Custo>[] => [
        {
            accessorKey: "tipo",
            header: "Tipo",
        },
        {
            accessorKey: "valor",
            header: "Valor (R$)",
            cell: ({ row }) => (row.getValue("valor") as number).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }),
        },
        {
            accessorKey: "cliente.nome",
            header: "Cliente",
        },
        {
            id: "acoes",
            cell: ({ row }) => {
                const custo = row.original

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
                                <Link href={`/custos/${custo.id}`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDelete(custo.id)}
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