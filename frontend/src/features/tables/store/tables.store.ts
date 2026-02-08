import { create } from "zustand";
import { getTablesRequest } from "../api/tables.api";
import type { Table } from "../types/tables.types";

type TablesState = {
    tables: Table[];

    isLoading: boolean;
    error: string | null;

    fetchTables: () => Promise<void>;
};

export const useTablesStore = create<TablesState>((set, get) => ({
    tables: [],

    isLoading: false,
    error: null,

    fetchTables: async () => {
        set({ isLoading: true, error: null });

        try {
            const res = await getTablesRequest();

            set({
                tables: res.data,
            });
        } catch (err) {
            set({ error: err instanceof Error ? err.message : String(err) });
        } finally {
            set({ isLoading: false });
        }
    },
}));
