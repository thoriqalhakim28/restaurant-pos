import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";

interface ErrorStateProps {
    error: string;
    className?: string;
}

export function ErrorState({ error, className }: ErrorStateProps) {
    return (
        <div className={cn("rounded-lg border border-red-200 bg-red-50 p-4", className)}>
            <div className="flex items-start gap-3">
                <AlertCircleIcon className="size-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-red-600">{error}</div>
            </div>
        </div>
    );
}
