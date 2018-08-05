<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ParticipateInForumTest extends TestCase
{

    use DatabaseMigrations;

    public function test_unauthenticated_user_may_not_add_replies()
    {
        $this->withoutExceptionHandling();
        $this->expectException('Illuminate\Auth\AuthenticationException');

        $thread = factory('App\Model\Thread')->create();
        $response = $this->post($thread->path().'/replies', []);
        $this->withExceptionHandling();
        $response->assertStatus(302);



    }

    public function test_an_authenticated_user_may_participate_in_forum_threads()
    {
        $this->be($user = factory('App\User')->create());
        $thread = factory('App\Model\Thread')->create();
        $reply = factory('App\Model\Reply')->create();

        $this->post($thread->path().'/replies', $reply->toArray());

        $response = $this->get($thread->path())
            ->assertSee($reply->body);

    }

}
