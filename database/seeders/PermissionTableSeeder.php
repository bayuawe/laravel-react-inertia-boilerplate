<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // dashboard permissions
        Permission::firstOrCreate(['name' => 'dashboard-access']);

        // users permissions
        Permission::firstOrCreate(['name' => 'users-access']);
        Permission::firstOrCreate(['name' => 'users-data']);
        Permission::firstOrCreate(['name' => 'users-create']);
        Permission::firstOrCreate(['name' => 'users-update']);
        Permission::firstOrCreate(['name' => 'users-delete']);

        // roles permissions
        Permission::firstOrCreate(['name' => 'roles-access']);
        Permission::firstOrCreate(['name' => 'roles-data']);
        Permission::firstOrCreate(['name' => 'roles-create']);
        Permission::create(['name' => 'roles-update']);
        Permission::create(['name' => 'roles-delete']);

        // permissions permissions
        Permission::create(['name' => 'permissions-access']);
        Permission::create(['name' => 'permissions-data']);
        Permission::create(['name' => 'permissions-create']);
        Permission::create(['name' => 'permissions-update']);
        Permission::create(['name' => 'permissions-delete']);
    }
}
