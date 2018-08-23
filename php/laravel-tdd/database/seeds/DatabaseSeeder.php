<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = factory('App\User')->create([
            'name' => 'hoge',
            'email' => 'hoge@example.com',
            'password' => bcrypt('hogehoge')
        ]);

        $threads = factory('App\Model\Thread', 50)->create();
        $threads->each(function($thread){ factory('App\Model\Reply',10)->create(['thread_id' => $thread->id ]); });

        // $this->call(UsersTableSeeder::class);
    }
}
