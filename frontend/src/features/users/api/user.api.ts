import { api } from "@/lib/axios";
import type { UserListResponse } from "../types/user.types";

export async function getUsersRequest() {
    const res = await api.get<UserListResponse>("/users");
    return res.data;
}
