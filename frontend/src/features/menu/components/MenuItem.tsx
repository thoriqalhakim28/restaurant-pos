import { formatCurrencyIDR } from "@/lib/format";
import type { Menu } from "../types/menu.types";
import { useMenuStore } from "../store/menu.store";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import FormMenuModal from "./FormMenuModal";

interface MenuItemProps {
    menu: Menu;
}

export default function MenuItem({ menu }: MenuItemProps) {
    const deleteMenu = useMenuStore((state) => state.deleteMenu);

    const handleDelete = async () => {
        if (confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
            try {
                await deleteMenu(menu.id, menu.category_id);
                toast.success("Menu berhasil dihapus");
            } catch {
                toast.error("Gagal menghapus menu");
            }
        }
    };
    return (
        <div className="flex items-start justify-between rounded-lg border p-3">
            <div className="flex-1">
                <div className="space-y-0.5">
                    <h4 className="font-medium">{menu.name}</h4>
                    {menu.description && (
                        <p className="text-muted-foreground mt-1 text-sm">{menu.description}</p>
                    )}
                </div>
                <div className="text-lg font-semibold mt-1">{formatCurrencyIDR(menu.price)}</div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex gap-1">
                    <FormMenuModal menu={menu} categoryId={menu.category_id} />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDelete}
                        className="text-red-500"
                    >
                        <Trash2Icon size={14} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
