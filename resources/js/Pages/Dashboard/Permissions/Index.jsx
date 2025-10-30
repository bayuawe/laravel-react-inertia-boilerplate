import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Search } from 'lucide-react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Index({ permissions }) {
    const [search, setSearch] = useState('');

    const breadcrumb = [
        { title: "Dashboard", url: route('dashboard.index') },
        { title: "Permissions" }
    ];

    const handleSearch = () => {
        router.get(route('dashboard.permissions.index'), {
            search,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <DashboardLayout breadcrumb={breadcrumb}>
            <Head title="Permissions" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Permissions</h1>
                </div>

                {/* Filters */}
                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="search"
                                placeholder="Search by name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-8"
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                    </div>
                    <Button onClick={handleSearch}>Search</Button>
                </div>

                {/* Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Created At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {permissions.data.map((permission) => (
                                <TableRow key={permission.id}>
                                    <TableCell className="font-medium">{permission.name}</TableCell>
                                    <TableCell>{new Date(permission.created_at).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing {permissions.from} to {permissions.to} of {permissions.total} results
                    </p>
                    <div className="flex gap-2">
                        {permissions.links.map((link, index) => (
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-2 text-sm rounded ${link.active
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-muted'
                                        }`}
                                    preserveScroll
                                >
                                    {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                </Link>
                            ) : (
                                <span
                                    key={index}
                                    className="px-3 py-2 text-sm rounded text-muted-foreground cursor-not-allowed"
                                >
                                    {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                </span>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
