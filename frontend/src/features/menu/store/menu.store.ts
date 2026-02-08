import { create } from "zustand";
import { createMenuRequest, deleteMenuRequest, getCategoriesRequest, updateMenuRequest } from "../api/menu.api";
import type { Category, CreateMenuPayload } from "../types/menu.types";

type MenuState = {
    categories: Category[];
    isLoading: boolean;
    error: string | null;

    fetchCategories: () => void;
    addMenu: (data: CreateMenuPayload) => void;
    updateMenu: (id: number, data: CreateMenuPayload) => void;
    deleteMenu: (id: number, categoryId: number) => void;
};

export const useMenuStore = create<MenuState>((set) => ({
    categories: [],
    isLoading: false,
    error: null,

    fetchCategories: async () => {
        set({ isLoading: true, error: null });

        try {
            const res = await getCategoriesRequest();
            set({ categories: res.data ?? [] });
        } catch (err) {
            set({ error: err instanceof Error ? err.message : String(err) });
        } finally {
            set({ isLoading: false });
        }
    },

    addMenu: async (data: CreateMenuPayload) => {
        const res = await createMenuRequest(data);
        const newMenu = res.data;

        set((state) => ({
            categories: state.categories.map((category) =>
                category.id === data.category_id
                    ? { ...category, menus: [...category.menus, newMenu] }
                    : category
            ),
        }));

        return newMenu;
    },

    updateMenu: async (id, data) => {
        const res = await updateMenuRequest(id, data);
        const updatedMenu = res.data;

        set((state) => ({
            categories: state.categories.map((cat) => ({
                ...cat,
                menus:
                    cat.id === data.category_id
                        ? cat.menus.map((m) => (m.id === id ? updatedMenu : m))
                        : cat.menus.filter((m) => m.id !== id),
            })),
        }));
    },

    deleteMenu: async (id, categoryId) => {
        await deleteMenuRequest(id);
        set((state) => ({
            categories: state.categories.map((cat) =>
                cat.id === categoryId
                    ? { ...cat, menus: cat.menus.filter((m) => m.id !== id) }
                    : cat
            ),
        }));
    },
}));
