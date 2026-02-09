export type UserRole = "waiter" | "cashier";

export type LoginPayload = {
    email: string;
    password: string;
};

export type LoginResponse = {
    success: boolean;
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            role: UserRole;
        };
        access_token: string;
    };
};
