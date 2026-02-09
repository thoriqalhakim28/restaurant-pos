import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTablesStore } from "@/features/tables/store/tables.store";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import OrderPanel from "../components/OrderPanel";
import { useOrdersStore } from "../store/orders.store";

export default function MobileOrderDetailPage() {
    const { tableId } = useParams<{ tableId: string }>();
    const navigate = useNavigate();

    const { tables, fetchTables } = useTablesStore();
    const { orders, fetchOrders } = useOrdersStore();

    const table = tables.find((t) => t.id === Number(tableId));
    const currentOrder = orders.find((o) => o.table.id === Number(tableId) && o.status === "open");

    useEffect(() => {
        fetchTables();
        fetchOrders();
    }, [fetchTables, fetchOrders]);

    const handleBack = () => {
        navigate(`/orders/${tableId}`);
    };

    const handleOrderClosed = () => {
        navigate("/orders");
    };

    if (!table) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
                <Spinner className="size-8" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-5rem)] space-y-4">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={handleBack}>
                    <ArrowLeftIcon size={20} />
                </Button>
                <div>
                    <h1 className="text-xl font-bold">Order Details</h1>
                    <p className="text-sm text-muted-foreground">Table {table.table_number}</p>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <OrderPanel
                    order={currentOrder || null}
                    tableNumber={table.table_number}
                    onOrderClosed={handleOrderClosed}
                />
            </div>
        </div>
    );
}
