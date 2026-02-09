import { create } from "zustand";
import type { User } from "../types/user.types";
import { getUsersRequest } from "../api/user.api";

type UsersState = {
    users: User[];

    isLoading: boolean;
    error: string | null;

    fetchUsers: () => Promise<void>;
};

export const useUsersStore = create<UsersState>((set, get) => ({
    users: [],

    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null });

        try {
            const res = await getUsersRequest();

            set({
                users: res.data,
            });
        } catch (err) {
            set({ error: err instanceof Error ? err.message : String(err) });
        } finally {
            set({ isLoading: false });
        }
    },
}));
