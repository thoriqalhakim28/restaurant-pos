import { Card, CardContent } from "@/components/ui/card";
import type { Table, TableStatus } from "../types/tables.types";

interface TableCardProps {
    table: Table;
}

const statusColors: Record<TableStatus, string> = {
    available: "bg-green-500 hover:bg-green-600 border-green-600",
    occupied: "bg-red-500 hover:bg-red-600 border-red-600",
    reserved: "bg-amber-500 hover:bg-amber-600 border-amber-600",
    inactive: "bg-gray-400 hover:bg-gray-500 border-gray-500",
};

export function TableCard({ table }: TableCardProps) {
    const colorClass = statusColors[table.status];

    return (
        <Card className={`${colorClass} cursor-pointer`}>
            <CardContent className="flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{table.table_number}</span>
            </CardContent>
        </Card>
    );
}
