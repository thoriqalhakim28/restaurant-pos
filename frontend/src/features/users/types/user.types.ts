export interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "waiter" | "cashier";
    is_active: boolean;
}

export interface UserListResponse {
    success: boolean;
    message: string;
    data: User[];
}
