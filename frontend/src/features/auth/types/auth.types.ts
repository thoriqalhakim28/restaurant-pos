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
            role: "admin" | "user";
        };
        access_token: string;
    };
};
