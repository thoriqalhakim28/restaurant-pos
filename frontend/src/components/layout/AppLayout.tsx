import { Outlet } from "react-router";
import Header from "./Header";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <div className="bg-muted flex-1">
                <main className="w-full max-w-7xl mx-auto py-6 px-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
