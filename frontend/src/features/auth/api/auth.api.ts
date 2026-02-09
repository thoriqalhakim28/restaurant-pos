import { api } from "@/lib/axios";
import type { LoginPayload, LoginResponse } from "../types/auth.types";

export async function login(payload: LoginPayload) {
    const res = await api.post<LoginResponse>("/login", payload);

    return res.data.data;
}
