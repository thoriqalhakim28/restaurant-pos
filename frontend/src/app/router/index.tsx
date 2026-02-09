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
import EmployeePage from "@/features/users/pages/UserPage";
import OrderPage from "@/features/orders/pages/OrderPage";
import TableOrderPage from "@/features/orders/pages/TableOrderPage";
import MobileOrderDetailPage from "@/features/orders/pages/MobileOrderDetailPage";

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
                path: "/dashboard",
                element: <DashboardPage />,
            },
            {
                path: "/orders",
                element: <OrderPage />,
            },
            {
                path: "/orders/:tableId",
                element: <TableOrderPage />,
            },
            {
                path: "/orders/:tableId/details",
                element: <MobileOrderDetailPage />,
            },
            {
                path: "/menus",
                element: <MenuPage />,
            },
            {
                path: "/users",
                element: <EmployeePage />,
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
