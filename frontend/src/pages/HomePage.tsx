import { useTablesStore, TableGrid } from "@/features/tables";
import type { TableStatus } from "@/features/tables";
import { useEffect } from "react";

const statusLegend: { status: TableStatus; label: string; color: string }[] = [
    { status: "available", label: "Available", color: "bg-green-500" },
    { status: "occupied", label: "Occupied", color: "bg-red-500" },
    { status: "reserved", label: "Reserved", color: "bg-amber-500" },
    { status: "inactive", label: "Inactive", color: "bg-gray-400" },
];

export default function HomePage() {
    const { tables, fetchTables, isLoading, error } = useTablesStore();

    useEffect(() => {
        fetchTables();
    }, [fetchTables]);

    const statusCounts = tables.reduce(
        (acc, table) => {
            acc[table.status] = (acc[table.status] || 0) + 1;
            return acc;
        },
        { available: 0, occupied: 0, reserved: 0, inactive: 0 } as Record<TableStatus, number>
    );

    return (
        <div className="flex flex-col w-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-bold">Table List</h1>
                <div className="flex flex-wrap items-center gap-4">
                    {statusLegend.map((item) => (
                        <div key={item.status} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded ${item.color}`} />
                            <span className="text-sm text-muted-foreground">
                                {item.label} ({statusCounts[item.status]})
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <TableGrid tables={tables} loading={isLoading} error={error} />
        </div>
    );
}
