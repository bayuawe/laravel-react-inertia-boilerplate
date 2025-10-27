import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Show({ user }) {
    const breadcrumb = [
        { title: "Dashboard", url: route('dashboard') },
        { title: "Users", url: route('dashboard.users.index') },
        { title: user.name }
    ];

    return (
        <DashboardLayout breadcrumb={breadcrumb}>
            <Head title={`User: ${user.name}`} />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">User Details</h1>
                    <div className="flex gap-2">
                        <Link href={route('dashboard.users.edit', user.id)}>
                            <Button>Edit User</Button>
                        </Link>
                        <Link href={route('dashboard.users.index')}>
                            <Button variant="outline">Back to Users</Button>
                        </Link>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <div className="bg-white p-6 shadow sm:rounded-lg dark:bg-sidebar">
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{user.name}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{user.email}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Verified</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {user.email_verified_at ? (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                            Verified
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                                            Unverified
                                        </span>
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {new Date(user.created_at).toLocaleString()}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Updated At</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {new Date(user.updated_at).toLocaleString()}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
