import type { Table } from "@/features/tables/types/tables.types";
import type { Menu } from "@/features/menu/types/menu.types";

export type OrderStatus = "open" | "closed" | "cancelled";

export interface OrderUser {
    id: number;
    name: string;
}

export interface OrderDetail {
    id: number;
    order_id: number;
    menu: Menu;
    quantity: number;
    price: number;
    subtotal: number;
    notes: string | null;
}

export interface Order {
    id: number;
    order_number: string;
    table: Table;
    user: OrderUser;
    total_amount: number;
    status: OrderStatus;
    order_date: string;
    details: OrderDetail[];
    created_at: string;
    updated_at: string;
}

export interface OrderListResponse {
    success: boolean;
    message: string;
    data: Order[];
}

export interface OrderResponse {
    success: boolean;
    message: string;
    data: Order;
}

export interface OpenOrderPayload {
    table_id: number;
}

export interface AddItemPayload {
    menu_id: number;
    quantity: number;
    notes?: string;
}

export interface UpdateItemPayload {
    quantity: number;
    notes?: string;
}
