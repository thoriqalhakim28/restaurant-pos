import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCurrencyIDR, formatDateTime } from "@/lib/format";
import { ErrorState } from "@/shared/components/ErrorState";
import { LoadingState } from "@/shared/components/LoadingState";
import { EyeIcon, TableIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useOrdersStore } from "../store/orders.store";
import type { Order } from "../types/order.types";
import OrderDetailSheet from "./OrderDetailSheet";

export default function OrderListTab() {
    const navigate = useNavigate();
    const { orders, isLoading, error } = useOrdersStore();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const statusColors = {
        open: "bg-green-100 text-green-800",
        closed: "bg-gray-100 text-gray-800",
        cancelled: "bg-red-100 text-red-800",
    };

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
        setSheetOpen(true);
    };

    const handleGoToTable = (tableId: number) => {
        navigate(`/orders/${tableId}`);
    };

    if (isLoading && orders.length === 0) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState error={error} />;
    }

    return (
        <>
            {orders.length === 0 ? (
                <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center">
                    No orders found
                </div>
            ) : (
                <div className="space-y-2">
                    <Card className="hidden md:block">
                        <CardContent>
                            <div className="w-full overflow-hidden rounded-md border">
                                <Table>
                                    <TableHeader className="bg-muted">
                                        <TableRow>
                                            <TableHead>Order #</TableHead>
                                            <TableHead>Table</TableHead>
                                            <TableHead>Items</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium">
                                                    {order.order_number}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <TableIcon
                                                            size={14}
                                                            className="text-muted-foreground"
                                                        />
                                                        Table {order.table.table_number}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {order.details.length} item(s)
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {formatCurrencyIDR(order.total_amount)}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={statusColors[order.status]}>
                                                        {order.status.toUpperCase()}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground text-sm">
                                                    {formatDateTime(order.created_at)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleViewDetails(order)}
                                                        >
                                                            <EyeIcon size={14} />
                                                            Details
                                                        </Button>
                                                        {order.status === "open" && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleGoToTable(order.table.id)
                                                                }
                                                            >
                                                                Go to Table
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="md:hidden space-y-3">
                        {orders.map((order) => (
                            <div key={order.id} className="rounded-lg border p-4 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-semibold">{order.order_number}</p>
                                        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                                            <TableIcon size={14} />
                                            Table {order.table.table_number}
                                        </div>
                                    </div>
                                    <Badge className={statusColors[order.status]}>
                                        {order.status.toUpperCase()}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        {order.details.length} item(s)
                                    </span>
                                    <span className="font-semibold">
                                        {formatCurrencyIDR(order.total_amount)}
                                    </span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {formatDateTime(order.created_at)}
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleViewDetails(order)}
                                    >
                                        <EyeIcon size={14} />
                                        View Details
                                    </Button>
                                    {order.status === "open" && (
                                        <Button
                                            variant="default"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => handleGoToTable(order.table.id)}
                                        >
                                            Go to Table
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <OrderDetailSheet order={selectedOrder} open={sheetOpen} onOpenChange={setSheetOpen} />
        </>
    );
}
