import { create } from "zustand";
import {
    addItemToOrderRequest,
    cancelOrderRequest,
    closeOrderRequest,
    getOrderByIdRequest,
    getOrdersRequest,
    openOrderRequest,
    removeOrderItemRequest,
    updateOrderItemRequest,
} from "../api/orders.api";
import type { AddItemPayload, Order, UpdateItemPayload } from "../types/order.types";

type OrdersState = {
    orders: Order[];
    selectedOrder: Order | null;
    isLoading: boolean;
    error: string | null;

    fetchOrders: (status?: string) => Promise<void>;
    fetchOrderById: (id: number) => Promise<void>;
    openOrder: (tableId: number) => Promise<Order>;
    addItem: (orderId: number, data: AddItemPayload) => Promise<void>;
    updateItem: (orderId: number, itemId: number, data: UpdateItemPayload) => Promise<void>;
    removeItem: (orderId: number, itemId: number) => Promise<void>;
    closeOrder: (orderId: number) => Promise<void>;
    cancelOrder: (orderId: number) => Promise<void>;
    clearSelectedOrder: () => void;
};

export const useOrdersStore = create<OrdersState>((set) => ({
    orders: [],
    selectedOrder: null,
    isLoading: false,
    error: null,

    fetchOrders: async (status?: string) => {
        set({ isLoading: true, error: null });

        try {
            const res = await getOrdersRequest(status);
            set({ orders: res.data ?? [] });
        } catch (err) {
            set({ error: err instanceof Error ? err.message : String(err) });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchOrderById: async (id: number) => {
        set({ isLoading: true, error: null });

        try {
            const res = await getOrderByIdRequest(id);
            set({ selectedOrder: res.data });
        } catch (err) {
            set({ error: err instanceof Error ? err.message : String(err) });
        } finally {
            set({ isLoading: false });
        }
    },

    openOrder: async (tableId: number) => {
        const res = await openOrderRequest({ table_id: tableId });
        const newOrder = res.data;

        set((state) => ({
            orders: [newOrder, ...state.orders],
            selectedOrder: newOrder,
        }));

        return newOrder;
    },

    addItem: async (orderId: number, data: AddItemPayload) => {
        const res = await addItemToOrderRequest(orderId, data);
        const updatedOrder = res.data;

        set((state) => ({
            orders: state.orders.map((o) => (o.id === orderId ? updatedOrder : o)),
            selectedOrder: state.selectedOrder?.id === orderId ? updatedOrder : state.selectedOrder,
        }));
    },

    updateItem: async (orderId: number, itemId: number, data: UpdateItemPayload) => {
        const res = await updateOrderItemRequest(orderId, itemId, data);
        const updatedOrder = res.data;

        set((state) => ({
            orders: state.orders.map((o) => (o.id === orderId ? updatedOrder : o)),
            selectedOrder: state.selectedOrder?.id === orderId ? updatedOrder : state.selectedOrder,
        }));
    },

    removeItem: async (orderId: number, itemId: number) => {
        const res = await removeOrderItemRequest(orderId, itemId);
        const updatedOrder = res.data;

        set((state) => ({
            orders: state.orders.map((o) => (o.id === orderId ? updatedOrder : o)),
            selectedOrder: state.selectedOrder?.id === orderId ? updatedOrder : state.selectedOrder,
        }));
    },

    closeOrder: async (orderId: number) => {
        const res = await closeOrderRequest(orderId);
        const updatedOrder = res.data;

        set((state) => ({
            orders: state.orders.map((o) => (o.id === orderId ? updatedOrder : o)),
            selectedOrder: state.selectedOrder?.id === orderId ? updatedOrder : state.selectedOrder,
        }));
    },

    cancelOrder: async (orderId: number) => {
        const res = await cancelOrderRequest(orderId);
        const updatedOrder = res.data;

        set((state) => ({
            orders: state.orders.map((o) => (o.id === orderId ? updatedOrder : o)),
            selectedOrder: state.selectedOrder?.id === orderId ? updatedOrder : state.selectedOrder,
        }));
    },

    clearSelectedOrder: () => {
        set({ selectedOrder: null });
    },
}));
