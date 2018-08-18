<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProfilesTest extends TestCase
{

    use DatabaseMigrations;

    /**
     * @return void
     */
    public function test_a_user_has_a_profile()
    {
        $this->withoutExceptionHandling();
        $user = factory('App\User')->create();
        $this->get("/profiles/{$user->name}")
            ->assertSee($user->name);
    }

    public function test_profiles_display_all_threads_created_by_the_associated_user()
    {
        $this->withoutExceptionHandling();
        $user = factory('App\User')->create();
        $thread = factory('App\Model\Thread')->create([
            'user_id' => $user->id
        ]);
        $this->get("/profiles/{$user->name}")
            ->assertSee($thread->title)
            ->assertSee($thread->body)
            ->assertSee($thread->channel->name);
    }
}
