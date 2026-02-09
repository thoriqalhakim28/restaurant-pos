import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTablesStore } from "@/features/tables/store/tables.store";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MenuListPanel from "../components/MenuListPanel";
import OrderPanel from "../components/OrderPanel";
import { useOrdersStore } from "../store/orders.store";
import type { Menu } from "@/features/menu/types/menu.types";
import { toast } from "sonner";
import { formatCurrencyIDR } from "@/lib/format";

export default function TableOrderPage() {
    const { tableId } = useParams<{ tableId: string }>();
    const navigate = useNavigate();
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);

    const { tables, fetchTables } = useTablesStore();
    const { orders, openOrder, addItem, fetchOrders, clearSelectedOrder } = useOrdersStore();

    const table = tables.find((t) => t.id === Number(tableId));
    const currentOrder = orders.find((o) => o.table.id === Number(tableId) && o.status === "open");

    useEffect(() => {
        fetchTables();
        fetchOrders();
        return () => clearSelectedOrder();
    }, [fetchTables, fetchOrders, clearSelectedOrder]);

    const handleBack = () => {
        navigate("/orders");
    };

    const handleAddItem = async (menu: Menu, quantity: number, notes?: string) => {
        try {
            if (!currentOrder) {
                setIsCreatingOrder(true);
                const newOrder = await openOrder(Number(tableId));
                await addItem(newOrder.id, { menu_id: menu.id, quantity, notes });
                toast.success("Order created and item added");
                setIsCreatingOrder(false);
            } else {
                await addItem(currentOrder.id, { menu_id: menu.id, quantity, notes });
                toast.success("Item added to order");
            }
        } catch (error) {
            toast.error("Failed to add item");
            console.error(error);
            setIsCreatingOrder(false);
        }
    };

    const handleOrderClosed = () => {
        fetchTables();
        fetchOrders("open");
    };

    if (!table) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
                <Spinner className="size-8" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-5rem)] space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={handleBack}>
                    <ArrowLeftIcon size={20} />
                </Button>
                <div>
                    <h1 className="text-xl font-bold">Table {table.table_number}</h1>
                    <p className="text-sm text-muted-foreground">
                        {currentOrder ? `Order: ${currentOrder.order_number}` : "No active order"}
                    </p>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                <div className="w-full md:w-1/2 lg:w-3/5 overflow-hidden">
                    <MenuListPanel
                        onAddItem={handleAddItem}
                        disabled={isCreatingOrder || table.status === "inactive"}
                    />
                </div>

                <div className="hidden md:block md:w-1/2 lg:w-2/5 overflow-hidden">
                    <OrderPanel
                        order={currentOrder || null}
                        tableNumber={table.table_number}
                        onOrderClosed={handleOrderClosed}
                    />
                </div>
            </div>

            <div className="md:hidden p-4 bg-background rounded-xl border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">
                            {currentOrder
                                ? `${currentOrder.details?.length ?? 0} items`
                                : "No items yet"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {currentOrder
                                ? `Total: ${formatCurrencyIDR(currentOrder.total_amount)}`
                                : "Add items to start order"}
                        </p>
                    </div>
                    <Button
                        onClick={() => navigate(`/orders/${tableId}/details`)}
                        disabled={!currentOrder}
                    >
                        View Order
                    </Button>
                </div>
            </div>
        </div>
    );
}
