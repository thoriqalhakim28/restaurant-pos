import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { UtensilsCrossedIcon, LayoutDashboard } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function GuestHeader() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <div className="border-b">
            <div className="mx-auto flex h-16 items-center md:max-w-7xl px-4">
                <NavLink to="/" className="h-full items-center flex gap-2">
                    <div className="h-10 w-10 flex items-center justify-center bg-accent rounded-lg">
                        <UtensilsCrossedIcon size={24} />
                    </div>
                    <div className="text-2xl font-semibold">Restaurant POS</div>
                </NavLink>

                <div className="ml-auto flex items-center gap-2">
                    {isAuthenticated ? (
                        <NavLink to="/pos">
                            <Button>
                                <LayoutDashboard size={16} />
                                Dashboard
                            </Button>
                        </NavLink>
                    ) : (
                        <NavLink to="/login">
                            <Button>Sign in</Button>
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
}
