import { EmptyState } from "@/shared/components/EmptyState";
import { ErrorState } from "@/shared/components/ErrorState";
import { LoadingState } from "@/shared/components/LoadingState";
import { useTablesStore } from "@/features/tables/store/tables.store";
import { LayoutGridIcon } from "lucide-react";
import { useNavigate } from "react-router";
import OrderTableCard from "./OrderTableCard";

export default function TablesTab() {
    const navigate = useNavigate();

    const { tables, isLoading, error } = useTablesStore();

    const handleTableClick = (tableId: number) => {
        navigate(`/orders/${tableId}`);
    };

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState error={error} />;
    }

    if (tables.length === 0) {
        return (
            <EmptyState
                message="No tables found"
                icon={<LayoutGridIcon className="size-10 text-muted-foreground/50" />}
            />
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-white border border-gray-300" />
                    <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-500" />
                    <span>Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-500" />
                    <span>Reserved</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-slate-200 border border-slate-300" />
                    <span>Inactive</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {tables.map((table) => (
                    <OrderTableCard
                        key={table.id}
                        table={table}
                        onClick={() => handleTableClick(table.id)}
                    />
                ))}
            </div>
        </div>
    );
}
