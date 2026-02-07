import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { UtensilsCrossedIcon } from "lucide-react";

export default function Header() {
    return (
        <div className="border-b">
            <div className="mx-auto flex h-16 items-center md:max-w-7xl px-4">
                <div className="h-full items-center flex gap-2">
                    <div className="h-10 w-10 flex items-center justify-center bg-accent rounded-lg">
                        <UtensilsCrossedIcon size={24} />
                    </div>
                    <div className="text-2xl font-semibold">Restaurant POS</div>
                </div>
                <div className="ml-auto flex items-center">
                    <NavLink to="/login">
                        <Button>Sign in</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
