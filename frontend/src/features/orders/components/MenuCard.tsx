import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Menu } from "@/features/menu";
import { formatCurrencyIDR } from "@/lib/format";
import { PlusIcon } from "lucide-react";

interface MenuCardProps {
    menu: Menu;
    disabled?: boolean;
    handleAddItem: (menu: Menu) => void;
}

export default function MenuCard({ menu, disabled, handleAddItem }: MenuCardProps) {
    return (
        <Card className="overflow-hidden py-4 rounded-md">
            <CardHeader className="flex flex-row justify-between items-start px-4">
                <div className="space-y-1">
                    <CardTitle>{menu.name}</CardTitle>
                    <CardDescription>{menu.description}</CardDescription>
                    <div className="text-base font-semibold">{formatCurrencyIDR(menu.price)}</div>
                </div>
                <Button onClick={() => handleAddItem(menu)} disabled={disabled}>
                    <PlusIcon size={12} />
                </Button>
            </CardHeader>
        </Card>
    );
}
