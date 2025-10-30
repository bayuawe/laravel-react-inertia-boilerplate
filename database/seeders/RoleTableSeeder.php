<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // users
        $user_permissions = Permission::where('name', 'like', '%users%')->get();
        $user_group = Role::create(['name' => 'users-access']);
        $user_group->givePermissionTo($user_permissions);

        // roles
        $role_permissions = Permission::where('name', 'like', '%roles%')->get();
        $role_group = Role::create(['name' => 'roles-access']);
        $role_group->givePermissionTo($role_permissions);

        // permissions
        $permission_permissions = Permission::where('name', 'like', '%permissions%')->get();
        $permission_group = Role::create(['name' => 'permissions-access']);
        $permission_group->givePermissionTo($permission_permissions);

        // dashboard
        $dashboard_permissions = Permission::where('name', 'like', '%dashboard%')->get();
        $dashboard_group = Role::create(['name' => 'dashboard-access']);
        $dashboard_group->givePermissionTo($dashboard_permissions);

        // create new role
        $super_admin = Role::create(['name' => 'super-admin']);

        $super_admin->givePermissionTo(Permission::all());
    }
}
