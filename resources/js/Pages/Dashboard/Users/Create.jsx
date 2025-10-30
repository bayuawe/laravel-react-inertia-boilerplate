import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import InputError from '@/Components/InputError';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { toast } from 'react-toastify';

export default function Create({ roles }) {
    const breadcrumb = [
        { title: "Dashboard", url: route('dashboard.index') },
        { title: "Users", url: route('dashboard.users.index') },
        { title: "Create" }
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        selectedRoles: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('dashboard.users.store'), {
            onSuccess: () => {
                toast.success('User created successfully!');
            },
            onError: () => {
                toast.error('Failed to create user.');
            },
        });
    };

    return (
        <DashboardLayout breadcrumb={breadcrumb}>
            <Head title="Create User" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Create User</h1>
                </div>

                <div className="max-w-2xl">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
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

                        <div className="space-y-2">
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

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="space-y-2">
                            <Label>Roles</Label>
                            <div className="space-y-2">
                                {roles.map((role) => (
                                    <div key={role.id} className="flex items-center space-x-2">
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

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Create User
                            </Button>
                            <Link href={route('dashboard.users.index')}>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
