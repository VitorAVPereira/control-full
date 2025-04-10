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
import { createColumns } from "@/components/servicos/columns"
import { Cliente } from "@/types/cliente"
import { toast } from "sonner"
import { useServicos } from "@/hooks/useServicos"

const ServicoTable = dynamic(() => import('@/components/servicos/ServicoTable'), {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />
})

export default function ServicosPage() {
    const [isMounted, setIsMounted] = useState(false)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const { servicos, removeServico, isLoadingServicos } = useServicos()


    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleDelete = useCallback(async (id: number) => {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            try {
                await removeServico(id)
                toast.success('Cliente excluído com sucesso')
            } catch (error) {
                toast.error('Erro ao excluir cliente')
            }
        }
    }, [removeServico])

    const columns = useMemo(
        () => createColumns(handleDelete),
        [handleDelete]
    )

    const table = useReactTable({
        data: servicos || [],
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

    if (isLoadingServicos) {
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
                    <CardTitle className="text-2xl font-bold">Serviços</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex items-center py-4 gap-4">
                        <Input
                            placeholder="Filtrar por tipo..."
                            value={(table.getColumn("tipo")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("tipo")?.setFilterValue(event.target.value)
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
                            <Link href="/servicos/novo">
                                Novo Serviço
                            </Link>
                        </Button>
                    </div>

                    <ServicoTable table={table} columns={columns} />

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