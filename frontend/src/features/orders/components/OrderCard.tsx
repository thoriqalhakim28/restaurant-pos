import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Order } from "../types/order.types";
import { ClockIcon, EyeIcon, TableIcon } from "lucide-react";
import { formatCurrencyIDR } from "@/lib/format";

interface OrderCardProps {
    order: Order;
    onViewDetails: (order: Order) => void;
}

export default function OrderCard({ order, onViewDetails }: OrderCardProps) {
    const statusColors = {
        open: "bg-green-100 text-green-800",
        closed: "bg-gray-100 text-gray-800",
        cancelled: "bg-red-100 text-red-800",
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="font-semibold text-sm">{order.order_number}</p>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                            <ClockIcon size={12} />
                            {formatDate(order.created_at)}
                        </div>
                    </div>
                    <Badge className={statusColors[order.status]}>
                        {order.status.toUpperCase()}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex items-center gap-2 text-sm">
                    <TableIcon size={14} className="text-muted-foreground" />
                    <span>Table {order.table.table_number}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                    {order.details.length} item(s)
                </div>
                <div className="mt-2 font-semibold text-lg">
                    {formatCurrencyIDR(order.total_amount)}
                </div>
            </CardContent>
            <CardFooter className="pt-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => onViewDetails(order)}
                >
                    <EyeIcon size={14} />
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
}
