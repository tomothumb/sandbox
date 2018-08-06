<?php

namespace Tests\Unit;


use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ThreadTest extends TestCase
{
    use DatabaseMigrations;

    protected $thread;

    public function setUp()
    {
        parent::setUp();
        $this->thread = factory('App\Model\Thread')->create();
    }


    public function test_a_thread_can_make_a_string_path()
    {
        $thread = factory('App\Model\Thread')->create();
        $this->assertEquals("/threads/{$thread->channel->slug}/{$thread->id}", $thread->path());
    }

    public function test_a_thread_has_replies()
    {
        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $this->thread->replies);
//        $response = $this->get('/threads/',$this->thread->id)
//            ->assertSee()
    }

    public function test_a_thread_has_a_creator()
    {
        $this->assertInstanceOf('App\User', $this->thread->user);
    }

    public function test_a_thread_can_add_a_reply()
    {
        $this->thread->addReply([
            'body' => 'Foobar',
            'user_id' => 1
        ]);
        $this->assertCount(1,$this->thread->replies);
    }

    public function test_a_thread_belongs_to_a_channel()
    {
        $thread = factory('App\Model\Thread')->create();
        $this->assertInstanceOf('App\Model\Channel', $thread->channel);
    }

}
