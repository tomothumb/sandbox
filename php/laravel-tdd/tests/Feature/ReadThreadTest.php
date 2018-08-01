<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ReadThreadTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp()
    {
        parent::setUp();

        $this->thread = factory('App\Model\Thread')->create();
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_a_user_can_browse_threads()
    {
        $response = $this->get('/threads')
            ->assertSee($this->thread->title);

    }

    public function test_a_user_can_read_a_single_thread()
    {
        $response = $this->get('/threads/'.$this->thread->id)
            ->assertSee($this->thread->title);
    }

    public function test_a_user_can_read_replies_that_are_associated_with_a_thread(){
        $replies = factory('App\Model\Reply',5)->create(['thread_id' => $this->thread->id ]);

        $response = $this->get('/threads/'.$this->thread->id)
            ->assertSee($replies[0]->body)
            ->assertSee($replies[0]->user->name);
    }

}
