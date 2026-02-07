import AppLayout from "@/components/layout/AppLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import GuestLayout from "@/components/layout/GuestLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import { createBrowserRouter } from "react-router";
import GuestRoute from "./guest";
import DashboardPage from "@/pages/DashboardPage";
import MenuPage from "@/features/menu/pages/MenuPage";

export const router = createBrowserRouter([
    {
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
        ],
    },
    {
        element: <AppLayout />,
        children: [
            {
                path: "/pos",
                element: <DashboardPage />,
            },
            {
                path: "/menus",
                element: <MenuPage />,
            },
        ],
    },
    {
        element: <AuthLayout />,
        children: [
            {
                element: <GuestRoute />,
                children: [
                    {
                        path: "/login",
                        element: <LoginPage />,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
