'use client'

import { useCallback, useMemo, useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useClientes } from "@/hooks/useClientes"
import { createColumns } from "@/components/clientes/columns"
import { Cliente } from "@/types/cliente"
import { toast } from "sonner"

const ClienteTable = dynamic(() => import('@/components/clientes/ClienteTable'), {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />
})

export default function ClientesPage() {
    const [isMounted, setIsMounted] = useState(false)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const { clientes, removeCliente, isLoadingClientes } = useClientes()

    
    useEffect(() => {
        setIsMounted(true)
    }, [])
    
    const handleDelete = useCallback(async (id: number) => {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            try {
                await removeCliente(id)
                toast.success('Cliente excluído com sucesso')
            } catch (error) {
                toast.error('Erro ao excluir cliente')
            }
        }
    }, [removeCliente])
    
    const columns = useMemo(
        () => createColumns(handleDelete),
        [handleDelete]
    )
    
    const table = useReactTable({
        data: clientes || [],
        columns: columns as ColumnDef<Cliente>[],
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })
    
    if (isLoadingClientes) {
        return (
            <div className="container max-w-6xl py-8">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-[200px]" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[400px] w-full" />
                    </CardContent>
                </Card>
            </div>
        )
    }
    
    if (!isMounted) {
        return (
            <div className="container max-w-6xl py-8">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-[200px]" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[400px] w-full" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container max-w-6xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Clientes</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex items-center py-4 gap-4">
                        <Input
                            placeholder="Filtrar por nome..."
                            value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("nome")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Colunas <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button asChild>
                            <Link href="/clientes/novo">
                                Novo Cliente
                            </Link>
                        </Button>
                    </div>

                    <ClienteTable table={table} columns={columns} />

                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="flex-1 text-sm text-muted-foreground">
                            {table.getFilteredSelectedRowModel().rows.length} de{" "}
                            {table.getFilteredRowModel().rows.length} linha(s) selecionadas
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Anterior
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Próxima
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}