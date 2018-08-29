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

    public function test_unauthorized_users_cannot_delete_replies()
    {
        $this->withExceptionHandling();

        $reply = factory('App\Model\Reply')->create();
        $response = $this->delete("/replies/{$reply->id}")
            ->assertRedirect("/login");

        $this->be($user = factory('App\User')->create());
        $response = $this->delete("/replies/{$reply->id}")
            ->assertStatus(403);
    }

    public function test_authorized_users_can_delete_replies()
    {
        $this->withExceptionHandling();
        $this->be($user = factory('App\User')->create());

        $reply = factory('App\Model\Reply')->create([
            'user_id' => auth()->id()
        ]);

        $response = $this->delete("/replies/{$reply->id}")
         ->assertStatus(302);
        $this->assertDatabaseMissing('replies',['id' => $reply->id]);
    }


    public function test_unauthorized_users_cannot_updat_replies()
    {
        $this->withExceptionHandling();

        $reply_message = "updated reply";

        $reply = factory('App\Model\Reply')->create();
        $response = $this->patch("/replies/{$reply->id}")
            ->assertRedirect("/login");

        $this->be($user = factory('App\User')->create());
        $response = $this->patch("/replies/{$reply->id}",[
            'body' => $reply_message
        ])
            ->assertStatus(403);
    }

    public function test_authorized_users_can_updat_replies()
    {
//        $this->withExceptionHandling();
        $this->be($user = factory('App\User')->create());

        $reply = factory('App\Model\Reply')->create([
            'user_id' => auth()->id()
        ]);

        $reply_message = "updated reply";
        $response = $this->patch("/replies/{$reply->id}",[
            'body' => $reply_message
        ])
//            ->assertStatus(302)
        ;
        $this->assertDatabaseHas('replies',[
            'id' => $reply->id,
            'body' => $reply_message
        ]);
    }

}
