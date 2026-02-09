import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
    message?: string;
    className?: string;
}

export function LoadingState({ message, className }: LoadingStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-3 py-12", className)}>
            <Spinner className="size-8" />
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </div>
    );
}
