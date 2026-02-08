import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import AddMenuModal from "../components/FormMenuModal";
import MenuItem from "../components/MenuItem";
import { useMenuStore } from "../store/menu.store";

export default function MenuPage() {
    const { categories, isLoading, error, fetchCategories } = useMenuStore();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const selectedCategory =
        categories.find((c) => c.id === selectedCategoryId) || categories[0] || null;

    return (
        <div className="space-y-6 p-4 md:p-0">
            <div className="space-y-0.5">
                <h1 className="text-2xl font-bold">Menu</h1>
                <p className="text-muted-foreground text-sm">Manage categories and menu items</p>
            </div>

            {isLoading && categories.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                    <Spinner className="size-8" />
                </div>
            ) : error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
                    {error}
                </div>
            ) : categories.length === 0 ? (
                <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center">
                    No categories found. Create a category first.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="col-span-1 lg:col-span-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategoryId(category.id)}
                                            className={cn(
                                                "flex shrink-0 items-center justify-between rounded-md px-3 py-2 text-left transition-colors lg:w-full",
                                                selectedCategory?.id === category.id
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted/50 hover:bg-muted lg:bg-transparent"
                                            )}
                                        >
                                            <span className="font-medium whitespace-nowrap">
                                                {category.name}
                                            </span>
                                            <span className="ml-2 rounded-full px-2 py-0.5 text-xs bg-muted-foreground/20">
                                                {category.menus.length}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="col-span-1 lg:col-span-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-xl">
                                    {selectedCategory?.name ?? "Select a category"}
                                </CardTitle>
                                {selectedCategory && (
                                    <AddMenuModal categoryId={selectedCategory.id} />
                                )}
                            </CardHeader>
                            <CardContent>
                                {selectedCategory ? (
                                    selectedCategory.menus.length === 0 ? (
                                        <p className="text-muted-foreground text-sm">
                                            No menu items in this category
                                        </p>
                                    ) : (
                                        <div className="space-y-3">
                                            {selectedCategory.menus.map((menu) => (
                                                <MenuItem key={menu.id} menu={menu} />
                                            ))}
                                        </div>
                                    )
                                ) : (
                                    <p className="text-muted-foreground text-sm">
                                        Select a category to view menus
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
