import { useAuthStore } from "@/features/auth/store/auth.store";
import { Navigate, Outlet } from "react-router";

export default function GuestRoute() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/pos" replace />;
    }

    return <Outlet />;
}
