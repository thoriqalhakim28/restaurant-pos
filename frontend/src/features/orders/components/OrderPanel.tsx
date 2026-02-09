import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { formatCurrencyIDR, formatDate } from "@/lib/format";
import { DotIcon, MinusIcon, PlusIcon, StickyNoteIcon, Trash2Icon, XIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import { useOrdersStore } from "../store/orders.store";
import type { Order, OrderDetail } from "../types/order.types";
import { Input } from "@/components/ui/input";

interface OrderPanelProps {
    order: Order | null;
    tableNumber: number;
    onOrderClosed: () => void;
}

export default function OrderPanel({ order, tableNumber, onOrderClosed }: OrderPanelProps) {
    const [isClosing, setIsClosing] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const [updatingItemId, setUpdatingItemId] = useState<number | null>(null);
    const [editingNotesItem, setEditingNotesItem] = useState<OrderDetail | null>(null);
    const [notesValue, setNotesValue] = useState("");
    const [isSavingNotes, setIsSavingNotes] = useState(false);
    const [openNotesDialog, setOpenNotesDialog] = useState(false);

    const { closeOrder, cancelOrder, updateItem, removeItem } = useOrdersStore();

    async function handleCloseOrder() {
        if (!order) return;
        setIsClosing(true);
        try {
            await closeOrder(order.id);
            toast.success("Order closed successfully");
            onOrderClosed();
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
            onOrderClosed();
        } catch (error) {
            toast.error("Failed to cancel order");
            console.error(error);
        } finally {
            setIsCancelling(false);
        }
    }

    async function handleUpdateQuantity(item: OrderDetail, delta: number) {
        if (!order) return;
        const newQuantity = item.quantity + delta;

        if (newQuantity < 1) {
            handleRemoveItem(item.id);
            return;
        }

        setUpdatingItemId(item.id);
        try {
            await updateItem(order.id, item.id, { quantity: newQuantity });
        } catch (error) {
            toast.error("Failed to update item");
            console.error(error);
        } finally {
            setUpdatingItemId(null);
        }
    }

    async function handleRemoveItem(itemId: number) {
        if (!order) return;
        setUpdatingItemId(itemId);
        try {
            await removeItem(order.id, itemId);
            toast.success("Item removed");
        } catch (error) {
            toast.error("Failed to remove item");
            console.error(error);
        } finally {
            setUpdatingItemId(null);
        }
    }

    function handleOpenNotesDialog(item: OrderDetail) {
        setEditingNotesItem(item);
        setNotesValue(item.notes || "");
        setOpenNotesDialog(true);
    }

    async function handleSaveNotes() {
        if (!order || !editingNotesItem) return;
        setIsSavingNotes(true);
        try {
            await updateItem(order.id, editingNotesItem.id, {
                quantity: editingNotesItem.quantity,
                notes: notesValue.trim() || undefined,
            });
            toast.success("Notes saved");
            setOpenNotesDialog(false);
        } catch (error) {
            toast.error("Failed to save notes");
            console.error(error);
        } finally {
            setIsSavingNotes(false);
        }
    }

    if (!order) {
        return (
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Table {tableNumber}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                        <p>No active order</p>
                        <p className="text-sm mt-1">Add items from the menu to start an order</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const isOpen = order.status === "open";

    return (
        <Fragment>
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>Table {tableNumber}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                        {order.order_number} <DotIcon /> {formatDate(order.order_date)}
                    </CardDescription>
                </CardHeader>

                <Separator />

                <CardContent className="flex-1 overflow-y-auto">
                    {!order.details || order.details.length === 0 ? (
                        <div className="text-muted-foreground h-full flex flex-col items-center justify-center">
                            <p>No items yet</p>
                            <p className="text-sm mt-1">Add items from the menu</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {order.details.map((item) => (
                                <div key={item.id} className="flex flex-col gap-3 border-b pb-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-medium text-sm truncate">
                                            {item.menu.name}
                                        </p>
                                        {item.notes && (
                                            <p className="text-xs text-muted-foreground italic">
                                                Note: {item.notes}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 flex items-center justify-between">
                                        {isOpen && (
                                            <div className="flex items-center gap-1">
                                                <div className="flex items-center border p-0.5 rounded-lg">
                                                    <Button
                                                        variant="ghost"
                                                        className="size-6"
                                                        onClick={() =>
                                                            handleUpdateQuantity(item, -1)
                                                        }
                                                        disabled={updatingItemId === item.id}
                                                    >
                                                        {updatingItemId === item.id ? (
                                                            <Spinner className="size-3" />
                                                        ) : (
                                                            <MinusIcon size={10} />
                                                        )}
                                                    </Button>
                                                    <span className="w-5 text-center text-xs">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        className="size-6"
                                                        onClick={() =>
                                                            handleUpdateQuantity(item, 1)
                                                        }
                                                        disabled={updatingItemId === item.id}
                                                    >
                                                        <PlusIcon size={10} />
                                                    </Button>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    className={`size-6 ${item.notes ? "text-primary" : ""}`}
                                                    onClick={() => handleOpenNotesDialog(item)}
                                                >
                                                    <StickyNoteIcon size={10} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    className="size-6 text-destructive"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    disabled={updatingItemId === item.id}
                                                >
                                                    <Trash2Icon size={10} />
                                                </Button>
                                            </div>
                                        )}
                                        <p className="font-semibold">
                                            {formatCurrencyIDR(item.subtotal)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>

                <Separator />

                <div className="px-6">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-xl">
                            {formatCurrencyIDR(order.total_amount)}
                        </span>
                    </div>
                </div>

                {isOpen && (
                    <CardFooter className="gap-6 pt-0">
                        <Button
                            variant="outline"
                            onClick={handleCancelOrder}
                            disabled={isCancelling || isClosing}
                            className="flex-1"
                        >
                            {isCancelling && <Spinner />}
                            <XIcon size={16} />
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCloseOrder}
                            disabled={
                                isClosing ||
                                isCancelling ||
                                !order.details ||
                                order.details.length === 0
                            }
                            className="flex-1"
                        >
                            {isClosing && <Spinner />}
                            Close Order
                        </Button>
                    </CardFooter>
                )}
            </Card>
            <Dialog open={openNotesDialog} onOpenChange={setOpenNotesDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Notes - {editingNotesItem?.menu.name}</DialogTitle>
                    </DialogHeader>
                    <Input
                        name="notes"
                        value={notesValue}
                        onChange={(e) => setNotesValue(e.target.value)}
                        placeholder="e.g. Extra spicy, no onions..."
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenNotesDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveNotes} disabled={isSavingNotes}>
                            {isSavingNotes && <Spinner className="mr-2" />}
                            Save Notes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
