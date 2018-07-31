<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ThreadTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_a_user_can_browse_threads()
    {
        $thread = factory('App\Model\Thread')->create();
        $response = $this->get('/threads');

        $response->assertStatus(200);
        $response->assertSee($thread->title);

    }

    public function test_a_user_can_read_a_single_thread(){
        $thread = factory('App\Model\Thread')->create();
        $response = $this->get('/threads/'.$thread->id);
        $response->assertSee($thread->title);
    }

}
