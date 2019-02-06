<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
//        $this->call(JpnicIpsTableSeeder::class);
//        $this->call(ApnicIpsTableSeeder::class);
        $this->call(RipeIpsTableSeeder::class);
        $this->call(AfrinicIpsTableSeeder::class);
        $this->call(LacnicIpsTableSeeder::class);
    }
}
