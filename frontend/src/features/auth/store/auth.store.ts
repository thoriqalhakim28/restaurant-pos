import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
};

type AuthState = {
    user: User | null;
    access_token: string | null;
    isAuthenticated: boolean;

    setAuth: (payload: { user: User; access_token: string }) => void;
    setToken: (token: string) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            access_token: null,
            isAuthenticated: false,

            setAuth: ({ user, access_token }) =>
                set({
                    user,
                    access_token,
                    isAuthenticated: true,
                }),

            setToken: (access_token) =>
                set({
                    access_token,
                    isAuthenticated: true,
                }),

            logout: () =>
                set({
                    user: null,
                    access_token: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                access_token: state.access_token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
