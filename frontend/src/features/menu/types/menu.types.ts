export interface Menu {
    id: number;
    category_id: number;
    name: string;
    description: string;
    price: number;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number;
    name: string;
    menus: Menu[];
    created_at: string;
    updated_at: string;
}

export interface CategoryListResponse {
    success: boolean;
    message: string;
    data: Category[];
}

export interface MenuResponse {
    success: boolean;
    message: string;
    data: Menu;
}

export interface CreateMenuPayload {
    category_id: number;
    name: string;
    description: string;
    price: number;
}
