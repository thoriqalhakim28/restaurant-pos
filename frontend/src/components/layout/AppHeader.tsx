import { NavLink, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { UtensilsCrossedIcon, LogOutIcon, MenuIcon } from "lucide-react";
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
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <MenuIcon size={24} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex h-full w-64 flex-col bg-sidebar">
                        <SheetHeader>
                            <SheetTitle className="flex items-center gap-2">
                                <div className="h-8 w-8 flex items-center justify-center bg-accent rounded-lg">
                                    <UtensilsCrossedIcon size={18} />
                                </div>
                                Restaurant POS
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex h-full flex-1 flex-col p-4">
                            <div className="flex h-full flex-col justify-between text-sm">
                                <div className="flex flex-col space-y-1">
                                    {NAV_ITEMS.map((item) => (
                                        <NavLink
                                            to={item.to}
                                            className={({ isActive }) =>
                                                `px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                                                    isActive
                                                        ? "bg-accent text-accent-foreground"
                                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                                }`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    ))}
                                </div>
                                <div className="mt-auto p-4 border-t">
                                    <div className="text-sm text-muted-foreground mb-2">
                                        Logged in as: {user?.name}
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => {
                                            handleLogout();
                                        }}
                                    >
                                        <LogOutIcon size={16} />
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

                <NavLink to="/dashboard" className="h-full items-center flex gap-2">
                    <div className="h-10 w-10 flex items-center justify-center bg-accent rounded-lg">
                        <UtensilsCrossedIcon size={24} />
                    </div>
                    <div className="text-2xl font-semibold hidden sm:block">Restaurant POS</div>
                </NavLink>

                <nav className="ml-8 hidden md:flex items-center gap-1">
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
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                        {user?.name}
                    </span>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                        <LogOutIcon size={16} />
                        <span className="hidden sm:inline">Logout</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
