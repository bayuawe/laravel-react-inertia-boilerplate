<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller implements HasMiddleware
{
    /**
     * middleware
     */
    public static function middleware()
    {
        return [
            new Middleware('permission:roles-data', only: ['index']),
            new Middleware('permission:roles-create', only: ['create']),
            new Middleware('permission:roles-update', only: ['update']),
            new Middleware('permission:roles-delete', only: ['destory']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // get all role data
        $roles = Role::query()
            ->with('permissions')
            ->when(request()->search, fn($query) => $query->where('name', 'like', '%' . request()->search . '%'))
            ->select('id', 'name')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        // get all permission data
        $permissions = Permission::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        // render view
        return inertia('Dashboard/Roles/Index', [
            'roles' => $roles,
            'permissions' => $permissions,
            'user' => Auth::user(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request)
    {
        // create new role data
        $role = Role::create(['name' => $request->name]);

        // give permissions to role
        $role->givePermissionTo($request->selectedPermission);

        // render view
        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleRequest $request, Role $role)
    {
        // update role data
        $role->update(['name' => $request->name]);

        // sync role permissions
        $role->syncPermissions($request->selectedPermission);

        // render view
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        // delete role data
        $role->delete();

        // render view
        return back();
    }
}
