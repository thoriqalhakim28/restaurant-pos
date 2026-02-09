import z from "zod";

export const menuSchema = z.object({
    category_id: z.string().min(1, "Kategori wajib dipilih"),
    name: z.string().min(3, "Nama minimal 3 karakter").max(255),
    description: z.string().optional(),
    price: z.coerce.number<number>(),
});

export type MenuSchema = z.infer<typeof menuSchema>;
