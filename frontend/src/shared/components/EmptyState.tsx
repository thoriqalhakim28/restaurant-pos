import { cn } from "@/lib/utils";
import { InboxIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
    message?: string;
    icon?: ReactNode;
    className?: string;
}

export function EmptyState({ message = "No data found", icon, className }: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-8 text-center",
                className
            )}
        >
            {icon || <InboxIcon className="size-10 text-muted-foreground/50" />}
            <p className="text-muted-foreground">{message}</p>
        </div>
    );
}
