import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Checkbox } from '@/Components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Index({ roles, permissions }) {
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [search, setSearch] = useState('');

    const breadcrumb = [
        { title: "Dashboard", url: route('dashboard.index') },
        { title: "Roles" }
    ];

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedRoles(roles.data.map(role => role.id));
        } else {
            setSelectedRoles([]);
        }
    };

    const handleSelectRole = (roleId, checked) => {
        if (checked) {
            setSelectedRoles([...selectedRoles, roleId]);
        } else {
            setSelectedRoles(selectedRoles.filter(id => id !== roleId));
        }
    };

    const handleBulkDelete = () => {
        if (selectedRoles.length === 0) return;

        if (confirm(`Are you sure you want to delete ${selectedRoles.length} role(s)?`)) {
            router.delete(route('dashboard.roles.destroy', selectedRoles.join(',')), {
                onSuccess: () => setSelectedRoles([]),
            });
        }
    };

    const handleSearch = () => {
        router.get(route('dashboard.roles.index'), {
            search,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <DashboardLayout breadcrumb={breadcrumb}>
            <Head title="Roles" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Roles</h1>
                    {/* <Link href="#">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Role
                        </Button>
                    </Link> */}
                </div>

                {/* Filters */}
                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="search"
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-8"
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                    </div>
                    <Button onClick={handleSearch}>Search</Button>
                </div>

                {/* Bulk Actions */}
                {selectedRoles.length > 0 && (
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                        <span className="text-sm">{selectedRoles.length} selected</span>
                        <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Selected
                        </Button>
                    </div>
                )}

                {/* Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">
                                    <Checkbox
                                        checked={selectedRoles.length === roles.data.length && roles.data.length > 0}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Permissions</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.data.map((role) => (
                                <TableRow key={role.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedRoles.includes(role.id)}
                                            onCheckedChange={(checked) => handleSelectRole(role.id, checked)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{role.name}</TableCell>
                                    <TableCell>
                                        {role.permissions && role.permissions.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {role.permissions.map((permission) => (
                                                    <span key={permission.id} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                                        {permission.name}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-500">No permissions</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{new Date(role.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {/* <DropdownMenuItem asChild>
                                                    <Link href={route('dashboard.roles.edit', role.id)}>
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem> */}
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this role?')) {
                                                            router.delete(route('dashboard.roles.destroy', role.id));
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing {roles.from} to {roles.to} of {roles.total} results
                    </p>
                    <div className="flex gap-2">
                        {roles.links.map((link, index) => (
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
