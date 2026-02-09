import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTablesStore } from "@/features/tables/store/tables.store";
import { ClipboardListIcon, LayoutGridIcon } from "lucide-react";
import { useEffect } from "react";
import OrderListTab from "../components/OrderListTab";
import TablesTab from "../components/TablesTab";
import { useOrdersStore } from "../store/orders.store";

export default function OrderPage() {
    const { fetchTables } = useTablesStore();
    const { fetchOrders } = useOrdersStore();

    useEffect(() => {
        fetchTables();
        fetchOrders();
    }, [fetchTables, fetchOrders]);

    return (
        <div className="space-y-6 p-4 md:p-0">
            <div className="space-y-0.5">
                <h1 className="text-2xl font-bold">Orders</h1>
                <p className="text-muted-foreground text-sm">Manage orders and tables</p>
            </div>

            <div className="bg-white p-6 rounded-xl">
                <Tabs defaultValue="tables" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="tables" className="flex items-center gap-2">
                            <LayoutGridIcon size={16} />
                            Tables
                        </TabsTrigger>
                        <TabsTrigger value="orders" className="flex items-center gap-2">
                            <ClipboardListIcon size={16} />
                            Order List
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="tables" className="mt-6">
                        <TablesTab />
                    </TabsContent>

                    <TabsContent value="orders" className="mt-6">
                        <OrderListTab />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
