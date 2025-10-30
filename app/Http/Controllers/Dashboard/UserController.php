<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class UserController extends Controller implements HasMiddleware
{
    /**
     * middleware
     */
    public static function middleware()
    {
        return [
            new Middleware('permission:users-data', only: ['index', 'show']),
            new Middleware('permission:users-create', only: ['create']),
            new Middleware('permission:users-update', only: ['update']),
            new Middleware('permission:users-destroy', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get all users data
        $users = User::query()
            ->with('roles')
            ->when(request()->search, fn($query) => $query->where('name', 'like', '%' . request()->search . '%')->orWhere('email', 'like', '%' . request()->search . '%'))
            ->select('id', 'name', 'avatar', 'email', 'email_verified_at', 'created_at')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        // render view
        return inertia('Dashboard/Users/Index', [
            'users' => $users,
            'user' => Auth::user(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // get all role data
        $roles = Role::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        // render view
        return inertia('Dashboard/Users/Create', [
            'roles' => $roles,
            'user' => Auth::user(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        // create new user data
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // assign role to user
        $user->assignRole($request->selectedRoles);

        // render view
        return to_route('dashboard.users.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        // get all role data
        $roles = Role::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        // load relationship
        $user->load(['roles' => fn($query) => $query->select('id', 'name'), 'roles.permissions' => fn($query) => $query->select('id', 'name')]);

        // render view
        return inertia('Dashboard/Users/Edit', [
            'roles' => $roles,
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        // check if user send request password
        if ($request->password)
            // update user data password
            $user->update([
                'password' => bcrypt($request->password),
            ]);

        // update user data name
        $user->update([
            'name' => $request->name,
        ]);

        // assign role to user
        $user->syncRoles($request->selectedRoles);

        // render view
        return to_route('dashboard.users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // load relationship
        $user->load(['roles' => fn($query) => $query->select('id', 'name'), 'roles.permissions' => fn($query) => $query->select('id', 'name')]);

        // render view
        return inertia('Dashboard/Users/Show', [
            'user' => $user
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $ids = explode(',', $id);

        if (count($ids) > 0)
            User::whereIn('id', $ids)->delete();
        else
            User::findOrFail($id)->delete();

        // render view
        return back();
    }
}
