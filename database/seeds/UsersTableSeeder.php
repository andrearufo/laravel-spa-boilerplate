<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
    * Run the database seeds.
    *
    * @return void
    */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Andrea Rufo',
            'email' => 'info@andrearufo.it',
            'password' => Hash::make('andrearufo')
        ]);

        DB::table('users')->insert([
            'name' => 'John Doe',
            'email' => 'john@doe.it',
            'password' => Hash::make('password')
        ]);
    }
}
