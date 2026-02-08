import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../types/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function LoginPage() {
    const setAuth = useAuthStore((state) => state.setAuth);

    const navigate = useNavigate();

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(val: LoginSchema) {
        try {
            const data = await login(val);

            setAuth({
                user: data.user,
                access_token: data.access_token,
            });

            toast.success("Login successful", { description: `Welcome back, ${data.user.name}!` });

            navigate("/dashboard", { replace: true });
        } catch {
            toast.error("Login failed", {
                description: "Please check your credentials and try again.",
            });
        }
    }
    return (
        <div className="flex flex-col w-full space-y-6">
            <div className="text-center space-y-1">
                <div className="text-4xl font-semibold">Login</div>
                <div>Please enter your credentials to log in.</div>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    {...field}
                                    type="email"
                                    placeholder="someone@example.com"
                                    tabIndex={1}
                                    autoFocus
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Password</FieldLabel>
                                <Input
                                    {...field}
                                    type="password"
                                    placeholder="********"
                                    tabIndex={2}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <Spinner />}
                        Login
                    </Button>
                </FieldGroup>
            </form>
        </div>
    );
}
