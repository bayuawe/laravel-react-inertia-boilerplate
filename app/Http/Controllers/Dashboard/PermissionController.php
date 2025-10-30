<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller implements HasMiddleware
{

    /**
     * middleware
     */
    public static function middleware()
    {
        return [
            new Middleware('permission:permission-data')
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $permissions = Permission::query()
            ->when(request()->search, fn($query) => $query->where('name', 'like', '%' . request()->search . '%'))
            ->select('id', 'name')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        // render view
        return inertia('Dashboard/Permissions/Index', [
            'permissions' => $permissions,
            'user' => Auth::user(),
        ]);
    }
}
