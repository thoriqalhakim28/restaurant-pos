import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { formatCurrencyIDR, formatDateTime } from "@/lib/format";
import { ClockIcon, DotIcon, TableIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useOrdersStore } from "../store/orders.store";
import type { Order } from "../types/order.types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrderDetailSheetProps {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function OrderDetailSheet({ order, open, onOpenChange }: OrderDetailSheetProps) {
    const [isClosing, setIsClosing] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const { closeOrder, cancelOrder } = useOrdersStore();

    if (!order) return null;

    const statusColors = {
        open: "bg-green-100 text-green-800",
        closed: "bg-gray-100 text-gray-800",
        cancelled: "bg-red-100 text-red-800",
    };

    async function handleCloseOrder() {
        if (!order) return;
        setIsClosing(true);
        try {
            await closeOrder(order.id);
            toast.success("Order closed successfully");
            onOpenChange(false);
        } catch (error) {
            toast.error("Failed to close order");
            console.error(error);
        } finally {
            setIsClosing(false);
        }
    }

    async function handleCancelOrder() {
        if (!order) return;
        setIsCancelling(true);
        try {
            await cancelOrder(order.id);
            toast.success("Order cancelled");
            onOpenChange(false);
        } catch (error) {
            toast.error("Failed to cancel order");
            console.error(error);
        } finally {
            setIsCancelling(false);
        }
    }

    const isOpen = order.status === "open";

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="flex flex-col w-full sm:max-w-lg p-0 h-full">
                <SheetHeader className="border-b shrink-0">
                    <SheetTitle>{order.order_number}</SheetTitle>
                    <SheetDescription className="flex items-center gap-1">
                        <Badge className={statusColors[order.status]}>
                            {order.status.toUpperCase()}
                        </Badge>
                        <DotIcon />
                        <div className="flex items-center gap-2">
                            <TableIcon size={14} />
                            <span>Table {order.table.table_number}</span>
                        </div>
                        <DotIcon />
                        <div className="flex items-center gap-2">
                            <ClockIcon size={14} />
                            <span>{formatDateTime(order.created_at)}</span>
                        </div>
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-1 min-h-0">
                    {order.details.length === 0 ? (
                        <div className="flex items-center justify-center h-48 text-muted-foreground">
                            No items in this order.
                        </div>
                    ) : (
                        <div className="space-y-3 p-4">
                            {order.details.map((item) => (
                                <div key={item.id} className="flex flex-col gap-1 border-b pb-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-medium truncate">{item.menu.name}</p>
                                        {item.notes && (
                                            <p className="text-xs text-muted-foreground italic">
                                                Note: {item.notes}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 flex items-center justify-between">
                                        <div className="text-sm">Qty: {item.quantity}</div>
                                        <div className="font-semibold">
                                            {formatCurrencyIDR(item.menu.price * item.quantity)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                <SheetFooter className="gap-4 border-t shrink-0">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-xl">
                            {formatCurrencyIDR(order.total_amount)}
                        </span>
                    </div>

                    {isOpen && (
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={handleCancelOrder}
                                disabled={isCancelling || isClosing}
                                className="flex-1"
                            >
                                {isCancelling && <Spinner className="size-4 mr-2" />}
                                <XIcon size={16} />
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCloseOrder}
                                disabled={isClosing || isCancelling || order.details.length === 0}
                                className="flex-1"
                            >
                                {isClosing && <Spinner className="size-4 mr-2" />}
                                Close Order
                            </Button>
                        </div>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
