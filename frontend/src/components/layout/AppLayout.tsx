import { Navigate, Outlet } from "react-router";
import AppHeader from "./AppHeader";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function AppLayout() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <AppHeader />
            <div className="bg-muted flex-1">
                <main className="w-full max-w-7xl mx-auto py-6 px-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
