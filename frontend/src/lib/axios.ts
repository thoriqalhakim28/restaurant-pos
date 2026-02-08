import { useAuthStore } from "@/features/auth/store/auth.store";
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().access_token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
