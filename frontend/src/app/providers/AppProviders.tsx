import { RouterProvider } from "react-router/dom";
import { router } from "../router/index";
import { Toaster } from "@/components/ui/sonner";

export default function AppProviders() {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster position="top-right" richColors />
        </>
    );
}
