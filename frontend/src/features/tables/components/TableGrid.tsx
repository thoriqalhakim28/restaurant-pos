import { TableCard } from "./TableCard";
import type { Table } from "../types/tables.types";

interface TableGridProps {
    tables: Table[];
    loading: boolean;
    error: string | null;
}

export function TableGrid({ tables, loading, error }: TableGridProps) {
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950">
                <p className="text-red-600 dark:text-red-400">Failed to load table data</p>
                <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-900">
                <p className="text-muted-foreground">Loading table data...</p>
            </div>
        );
    }

    if (tables.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-900">
                <p className="text-muted-foreground">No tables registered yet</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {tables.map((table) => (
                <TableCard key={table.id} table={table} />
            ))}
        </div>
    );
}
