<?php

namespace Tests\Unit;


use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ChannelTest extends TestCase
{
    use DatabaseMigrations;


    public function setUp()
    {
        parent::setUp();
        $this->thread = factory('App\Model\Thread')->create();
    }

    public function test_a_channel_consists_of_threads()
    {
        $channel = factory(\App\Model\Channel::class)->create();
        $thread = factory(\App\Model\Thread::class)->create([
            'channel_id' => $channel->id
        ]);
        $this->assertTrue($channel->threads->contains($thread));
        $this->assertInstanceOf('App\Model\Channel', $thread->channel);
    }


}
