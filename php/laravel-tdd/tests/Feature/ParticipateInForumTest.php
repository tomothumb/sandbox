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
        $this->withExceptionHandling();
        $response = $this->post('/threads/some-slug/1/replies', [])
            ->assertRedirect("/login");

    }

    public function test_an_authenticated_user_may_participate_in_forum_threads()
    {
        $this->be($user = factory('App\User')->create());
        $thread = factory('App\Model\Thread')->create();
        $reply = factory('App\Model\Reply')->make();

        $this->post($thread->path().'/replies', $reply->toArray());

        $response = $this->get($thread->path())
            ->assertSee($reply->body);

    }

    function test_a_reply_required_a_body()
    {
        $this->withExceptionHandling();
        $this->be($user = factory('App\User')->create());
        $thread = factory('App\Model\Thread')->create();
        $reply = factory('App\Model\Reply')->make(['body'=>null]);
        $this->post($thread->path().'/replies', $reply->toArray())
            ->assertSessionHasErrors('body');
    }

}
