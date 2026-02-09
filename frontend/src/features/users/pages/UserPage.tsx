import { useEffect } from "react";
import { useUsersStore } from "../store/user.store";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function EmployeePage() {
    const { users, fetchUsers, isLoading, error } = useUsersStore();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    console.log({ users, isLoading, error });
    return (
        <div className="space-y-6 p-4 md:p-0">
            <div className="space-y-0.5">
                <h1 className="text-2xl font-bold">Users</h1>
                <p className="text-muted-foreground text-sm">
                    Manage user accounts and permissions
                </p>
            </div>
            {isLoading && users.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                    <Spinner className="size-8" />
                </div>
            ) : error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
                    {error}
                </div>
            ) : users.length === 0 ? (
                <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center">
                    No users found. Create a user first.
                </div>
            ) : (
                <Card>
                    <CardContent>
                        <Table className="border">
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>
                                            {user.is_active ? "Active" : "Inactive"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
