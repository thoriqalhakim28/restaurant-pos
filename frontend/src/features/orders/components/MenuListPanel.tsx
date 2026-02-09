import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMenuStore } from "@/features/menu/store/menu.store";
import { SearchIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Menu } from "@/features/menu/types/menu.types";
import MenuCard from "./MenuCard";
import { LoadingState } from "@/shared/components";
import { Separator } from "@/components/ui/separator";

interface MenuListPanelProps {
    onAddItem: (menu: Menu, quantity: number, notes?: string) => void;
    disabled?: boolean;
}

export default function MenuListPanel({ onAddItem, disabled }: MenuListPanelProps) {
    const { categories, isLoading, fetchCategories } = useMenuStore();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const effectiveSelectedCategoryId = selectedCategoryId ?? categories[0]?.id ?? null;

    const selectedCategory = categories.find((c) => c.id === effectiveSelectedCategoryId);

    const filteredMenus = useMemo(() => {
        let menus: Menu[] = [];

        if (searchQuery.trim()) {
            menus = categories.flatMap((c) => c.menus);
        } else if (selectedCategory) {
            menus = selectedCategory.menus;
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            menus = menus.filter(
                (m) =>
                    m.name.toLowerCase().includes(query) ||
                    m.description?.toLowerCase().includes(query)
            );
        }

        return menus;
    }, [categories, selectedCategory, searchQuery]);

    const handleAddItem = (menu: Menu) => {
        onAddItem(menu, 1);
    };

    if (isLoading) {
        return <LoadingState />;
    }

    return (
        <div className="flex flex-col h-full bg-white rounded-xl border gap-4 py-4">
            <div className="px-4 space-y-4">
                <div className="flex gap-2 overflow-x-auto">
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={
                                effectiveSelectedCategoryId === category.id ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setSelectedCategoryId(category.id)}
                            className="shrink-0"
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
                <div className="relative">
                    <SearchIcon
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                        placeholder="Search menu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            <Separator />

            <div className="flex-1 overflow-y-auto px-4">
                {filteredMenus.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                        {searchQuery ? "No menu items found" : "No menu items in this category"}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {filteredMenus.map((menu) => {
                            return (
                                <MenuCard
                                    key={menu.id}
                                    menu={menu}
                                    handleAddItem={handleAddItem}
                                    disabled={disabled}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
