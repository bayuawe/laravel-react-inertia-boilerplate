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

export default function Index({ users, filters }) {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState(filters.search || '');
    // Use a non-empty sentinel for the Select component (Radix requires Select.Item values to be non-empty).
    // Map 'all' -> '' when sending requests so the backend still receives an empty string for "no filter".
    const initialVerified = (filters && (filters.verified === undefined || filters.verified === null || filters.verified === ''))
        ? 'all'
        : String(filters.verified);
    const [verified, setVerified] = useState(initialVerified);

    const breadcrumb = [
        { title: "Dashboard", url: route('dashboard') },
        { title: "Users" }
    ];

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedUsers(users.data.map(user => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (userId, checked) => {
        if (checked) {
            setSelectedUsers([...selectedUsers, userId]);
        } else {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        }
    };

    const handleBulkDelete = () => {
        if (selectedUsers.length === 0) return;

        if (confirm(`Are you sure you want to delete ${selectedUsers.length} user(s)?`)) {
            router.delete(route('dashboard.users.bulk-delete'), {
                data: { user_ids: selectedUsers },
                onSuccess: () => setSelectedUsers([]),
            });
        }
    };

    const handleSearch = () => {
        const verifiedParam = verified === 'all' ? '' : verified;
        router.get(route('dashboard.users.index'), {
            search,
            verified: verifiedParam,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleFilterChange = (value) => {
        setVerified(value);
        const verifiedParam = value === 'all' ? '' : value;
        router.get(route('dashboard.users.index'), {
            search,
            verified: verifiedParam,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <DashboardLayout breadcrumb={breadcrumb}>
            <Head title="Users" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Users</h1>
                    <Link href={route('dashboard.users.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <Label htmlFor="search">Search</Label>
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
                    <div className="w-48">
                        <Label htmlFor="verified">Email Verified</Label>
                        <Select value={verified} onValueChange={handleFilterChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* Radix Select.Item values must not be empty strings; use 'all' as a sentinel */}
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="1">Verified</SelectItem>
                                <SelectItem value="0">Unverified</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleSearch}>Search</Button>
                </div>

                {/* Bulk Actions */}
                {selectedUsers.length > 0 && (
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                        <span className="text-sm">{selectedUsers.length} selected</span>
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
                                        checked={selectedUsers.length === users.data.length && users.data.length > 0}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Verified</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedUsers.includes(user.id)}
                                            onCheckedChange={(checked) => handleSelectUser(user.id, checked)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {user.email_verified_at ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                                                Unverified
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('dashboard.users.show', user.id)}>
                                                        View
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('dashboard.users.edit', user.id)}>
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this user?')) {
                                                            router.delete(route('dashboard.users.destroy', user.id));
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
                        Showing {users.from} to {users.to} of {users.total} results
                    </p>
                    <div className="flex gap-2">
                        {users.links.map((link, index) => (
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-2 text-sm rounded ${
                                        link.active
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
