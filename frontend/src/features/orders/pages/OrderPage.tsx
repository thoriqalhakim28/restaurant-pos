import { useAuthStore } from "@/features/auth/store/auth.store";
import { useTablesStore } from "@/features/tables/store/tables.store";
import { useEffect } from "react";
import OrderListTab from "../components/OrderListTab";
import TablesTab from "../components/TablesTab";
import { useOrdersStore } from "../store/orders.store";

export default function OrderPage() {
    const { user } = useAuthStore();
    const { fetchTables } = useTablesStore();
    const { fetchOrders } = useOrdersStore();

    const isWaiter = user?.role === "waiter";
    const isCashier = user?.role === "cashier";

    useEffect(() => {
        if (isWaiter) {
            fetchTables();
        }
        if (isCashier) {
            fetchOrders();
        }
    }, [fetchTables, fetchOrders, isWaiter, isCashier]);

    return (
        <div className="space-y-6 p-4 md:p-0">
            <div className="space-y-0.5">
                <h1 className="text-2xl font-bold">
                    {isWaiter ? "Tables" : "Orders"}
                </h1>
                <p className="text-muted-foreground text-sm">
                    {isWaiter
                        ? "Select a table to create or manage orders"
                        : "View and manage all orders"}
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl">
                {isWaiter && <TablesTab />}
                {isCashier && <OrderListTab />}
            </div>
        </div>
    );
}
