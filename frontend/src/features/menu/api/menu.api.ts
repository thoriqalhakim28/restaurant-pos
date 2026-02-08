import { api } from "@/lib/axios";
import type { CategoryListResponse, CreateMenuPayload, MenuResponse } from "../types/menu.types";

export async function getCategoriesRequest() {
    const res = await api.get<CategoryListResponse>("/categories");
    return res.data;
}

export async function createMenuRequest(data: CreateMenuPayload) {
    const res = await api.post<MenuResponse>("/menus", data);
    return res.data;
}

export async function updateMenuRequest(id: number, data: CreateMenuPayload) {
    const res = await api.put<MenuResponse>(`/menus/${id}`, data);
    return res.data;
}

export async function deleteMenuRequest(id: number) {
    const res = await api.delete<{ success: boolean; message: string }>(`/menus/${id}`);
    return res.data;
}
