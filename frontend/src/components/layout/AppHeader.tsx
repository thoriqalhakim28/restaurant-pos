import { NavLink, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { UtensilsCrossedIcon, LogOutIcon } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { NAV_ITEMS } from "@/utils/constants/menu";

export default function AppHeader() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="border-b">
            <div className="mx-auto flex h-16 items-center md:max-w-7xl px-4">
                <NavLink to="/pos" className="h-full items-center flex gap-2">
                    <div className="h-10 w-10 flex items-center justify-center bg-accent rounded-lg">
                        <UtensilsCrossedIcon size={24} />
                    </div>
                    <div className="text-2xl font-semibold">Restaurant POS</div>
                </NavLink>

                <nav className="ml-8 flex items-center gap-1">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-accent text-accent-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{user?.name}</span>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                        <LogOutIcon size={16} />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
