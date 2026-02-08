import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit2Icon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { menuSchema, type MenuSchema } from "../types/menu.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useMenuStore } from "../store/menu.store";
import { toast } from "sonner";
import type { Menu } from "../types/menu.types";

interface FormMenuModalProps {
    categoryId?: number;
    menu?: Menu;
}

export default function FormMenuModal({ categoryId, menu }: FormMenuModalProps) {
    const [open, setOpen] = useState(false);
    const isEdit = !!menu;
    const { addMenu, updateMenu } = useMenuStore();

    const form = useForm<MenuSchema>({
        resolver: zodResolver(menuSchema),
        defaultValues: {
            category_id: categoryId?.toString() ?? "",
            name: "",
            description: "",
            price: 0,
        },
    });

    useEffect(() => {
        if (menu) {
            form.reset({
                category_id: menu.category_id.toString(),
                name: menu.name,
                description: menu.description || "",
                price: menu.price,
            });
        } else {
            form.setValue("category_id", categoryId?.toString() ?? "");
        }
    }, [menu, categoryId, form]);

    async function onSubmit(val: MenuSchema) {
        try {
            const payload = {
                category_id: parseInt(val.category_id),
                name: val.name,
                description: val.description ?? "",
                price: val.price,
            };

            if (isEdit && menu) {
                await updateMenu(menu.id, payload);
                toast.success("Menu updated successfully");
            } else {
                await addMenu(payload);
                toast.success("Menu added successfully");
            }
            handleOpenChange(false);
        } catch (error) {
            toast.error("Failed to save menu");
            console.log(error);
        }
    }

    function handleOpenChange(isOpen: boolean) {
        setOpen(isOpen);
        if (!isOpen && !isEdit) form.reset();
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {isEdit ? (
                    <Button variant="ghost" size="icon">
                        <Edit2Icon size={14} />
                    </Button>
                ) : (
                    <Button size="sm" variant="outline">
                        <PlusIcon size={16} /> Add Menu
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Menu" : "Add New Menu"}</DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Update the details of the menu item."
                            : "Fill in the details to add a new menu item."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} id="menu-form">
                    <input type="hidden" {...form.register("category_id")} />

                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Name</FieldLabel>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="e.g. Nasi Goreng"
                                        tabIndex={1}
                                        autoFocus
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Description</FieldLabel>
                                    <Textarea
                                        {...field}
                                        placeholder="e.g. A delicious menu item"
                                        tabIndex={2}
                                        rows={3}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="price"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Price (IDR)</FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="e.g. 25000"
                                        tabIndex={3}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            disabled={form.formState.isSubmitting}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" form="menu-form" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <Spinner />}
                        {isEdit ? "Update Menu" : "Add Menu"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
