<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        // get admin role
        $role = Role::where('name', 'super-admin')->first();

        // create new admin
        $user = User::create([
            'id' => Str::uuid(),
            'name' => 'Bayu Aryandi Wijaya',
            'email' => 'superadmin@mail.com',
            'password' => bcrypt('password'),
        ]);

        // assign a role to user
        $user->assignRole($role);
    }
}
