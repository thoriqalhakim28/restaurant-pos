import { Outlet } from "react-router";
import { Card, CardContent } from "../ui/card";

export default function AuthLayout() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <Card className="rounded-xl">
                        <CardContent>
                            <Outlet />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
