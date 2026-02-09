import type { UserRole } from "@/features/auth/types/auth.types";

type NavItem = {
    to: string;
    label: string;
    roles: UserRole[];
};

export const NAV_ITEMS: NavItem[] = [
    {
        to: "/dashboard",
        label: "Dashboard",
        roles: ["waiter", "cashier"],
    },
    {
        to: "/orders",
        label: "Orders",
        roles: ["waiter", "cashier"],
    },
    {
        to: "/menus",
        label: "Products",
        roles: ["waiter"],
    },
    {
        to: "/users",
        label: "Users",
        roles: ["waiter", "cashier"],
    },
];

export function getNavItemsByRole(role: UserRole | undefined): NavItem[] {
    if (!role) return [];
    return NAV_ITEMS.filter((item) => item.roles.includes(role));
}
