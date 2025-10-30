import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import InputError from '@/Components/InputError';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/Components/ui/card';
import { toast } from 'react-toastify';

export default function Edit({ user, roles }) {
    const breadcrumb = [
        { title: "Dashboard", url: route('dashboard.index') },
        { title: "Users", url: route('dashboard.users.index') },
        { title: "Edit" }
    ];

    const { data, setData, patch, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        selectedRoles: user.roles ? user.roles.map(role => role.id) : [],
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('dashboard.users.update', user.id), {
            onSuccess: () => {
                toast.success('User updated successfully!');
            },
            onError: () => {
                toast.error('Failed to update user.');
            },
        });
    };

    return (
        <DashboardLayout breadcrumb={breadcrumb}>
            <Head title="Edit User" />

            <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Edit User</h1>
                </div>

                <Card className="w-full shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">User Information</CardTitle>
                    </CardHeader>

                    <form onSubmit={submit}>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Leave blank to keep current"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="new-password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    autoComplete="new-password"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <div className="space-y-3">
                                <Label>Roles</Label>
                                <div className="grid gap-2 pl-1">
                                    {roles.map((role) => (
                                        <div key={role.id} className="flex items-center gap-2">
                                            <Checkbox
                                                id={`role-${role.id}`}
                                                checked={data.selectedRoles.includes(role.id)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setData('selectedRoles', [...data.selectedRoles, role.id]);
                                                    } else {
                                                        setData('selectedRoles', data.selectedRoles.filter(id => id !== role.id));
                                                    }
                                                }}
                                            />
                                            <Label htmlFor={`role-${role.id}`} className="text-sm font-normal">
                                                {role.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                <InputError message={errors.selectedRoles} />
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-end gap-3">
                            <Link href={route('dashboard.users.index')}>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                Update User
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </DashboardLayout>
    );
}
