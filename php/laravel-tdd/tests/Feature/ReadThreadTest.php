<?php

namespace Tests\Feature;

use App\Model\Thread;
use App\User;
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
        $this->replies = factory('App\Model\Reply',5)->create(['thread_id' => $this->thread->id ]);
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
        $response = $this->get("/threads/{$this->thread->channel->id}/{$this->thread->id}")
            ->assertSee($this->thread->title);
    }

    public function test_a_user_can_read_replies_that_are_associated_with_a_thread()
    {
        $response = $this->get("/threads/{$this->thread->channel->id}/{$this->thread->id}")
            ->assertSee($this->replies[0]->body)
            ->assertSee($this->replies[0]->user->name);
    }

    public function test_a_user_can_filter_threads_according_to_a_tag()
    {
        $channel = factory(\App\Model\Channel::class)->create();
        $thread = factory(Thread::class)->create([
            'channel_id' => $channel->id,
        ]);
        $threadNotInChannel = factory(Thread::class)->create();
        $response = $this->get("/threads/{$channel->slug}")
            ->assertSee($thread->title)
            ->assertDontSee($threadNotInChannel->title);
    }

    public function test_a_user_can_filter_threads_by_any_username()
    {
        $user = factory(User::class)->create([
            'name' => "foobar"
        ]);
        $this->be($user);

        $thread = factory(Thread::class)->create([
            'user_id' => $user->id
        ]);
        $other_thread = factory(Thread::class)->create();
        $response = $this->get("/threads?by=foobar")
            ->assertSee('foobar')
            ->assertSee($thread->title)
            ->assertDontSee($other_thread->title)
            ;
    }

}
