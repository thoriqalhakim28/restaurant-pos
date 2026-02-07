import AppLayout from "@/components/layout/AppLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import GuestLayout from "@/components/layout/GuestLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import { createBrowserRouter } from "react-router";
import GuestRoute from "./guest";
import DashboardPage from "@/pages/DashboardPage";

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
