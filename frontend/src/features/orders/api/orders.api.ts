import { api } from "@/lib/axios";
import type {
    AddItemPayload,
    OpenOrderPayload,
    OrderListResponse,
    OrderResponse,
    UpdateItemPayload,
} from "../types/order.types";

export async function getOrdersRequest(status?: string) {
    const params = status ? { status } : {};
    const res = await api.get<OrderListResponse>("/orders", { params });
    return res.data;
}

export async function getOrderByIdRequest(id: number) {
    const res = await api.get<OrderResponse>(`/orders/${id}`);
    return res.data;
}

export async function openOrderRequest(data: OpenOrderPayload) {
    const res = await api.post<OrderResponse>("/orders", data);
    return res.data;
}

export async function addItemToOrderRequest(orderId: number, data: AddItemPayload) {
    const res = await api.post<OrderResponse>(`/orders/${orderId}/items`, data);
    return res.data;
}

export async function updateOrderItemRequest(
    orderId: number,
    itemId: number,
    data: UpdateItemPayload
) {
    const res = await api.put<OrderResponse>(`/orders/${orderId}/items/${itemId}`, data);
    return res.data;
}

export async function removeOrderItemRequest(orderId: number, itemId: number) {
    const res = await api.delete<OrderResponse>(`/orders/${orderId}/items/${itemId}`);
    return res.data;
}

export async function closeOrderRequest(orderId: number) {
    const res = await api.post<OrderResponse>(`/orders/${orderId}/close`);
    return res.data;
}

export async function cancelOrderRequest(orderId: number) {
    const res = await api.post<OrderResponse>(`/orders/${orderId}/cancel`);
    return res.data;
}
