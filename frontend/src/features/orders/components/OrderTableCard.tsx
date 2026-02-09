import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Table, TableStatus } from "@/features/tables/types/tables.types";

interface OrderTableCardProps {
    table: Table;
    onClick: () => void;
}

const statusConfig: Record<
    TableStatus,
    { bg: string; border: string; text: string; label: string }
> = {
    available: {
        bg: "bg-white hover:bg-gray-50",
        border: "border-gray-300",
        text: "text-gray-900",
        label: "Available",
    },
    occupied: {
        bg: "bg-blue-500 hover:bg-blue-600",
        border: "border-blue-600",
        text: "text-white",
        label: "Occupied",
    },
    reserved: {
        bg: "bg-red-500 hover:bg-red-600",
        border: "border-red-600",
        text: "text-white",
        label: "Reserved",
    },
    inactive: {
        bg: "bg-slate-200 hover:bg-slate-200",
        border: "border-slate-300",
        text: "text-slate-400",
        label: "Inactive",
    },
};

export default function OrderTableCard({ table, onClick }: OrderTableCardProps) {
    const config = statusConfig[table.status];

    return (
        <Card
            className={cn("cursor-pointer transition-all", config.bg, config.border, config.text)}
            onClick={onClick}
        >
            <CardContent className="flex flex-col items-center justify-center p-4">
                <span className="text-3xl font-semibold">T - {table.table_number}</span>
            </CardContent>
        </Card>
    );
}
