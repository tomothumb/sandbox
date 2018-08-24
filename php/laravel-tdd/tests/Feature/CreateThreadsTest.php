<?php

namespace Tests\Feature;


use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class CreateThreadsTest extends TestCase
{
    use DatabaseMigrations;

    function test_guest_can_not_create_new_forum_threads()
    {
        $this->withExceptionHandling();

        $this->post('/threads')
            ->assertRedirect('/login');

        $this->get('/threads/create')
            ->assertRedirect('/login');
    }


    function test_an_authenticated_user_can_create_new_forum_threads()
    {
        $this->actingAs(factory('App\User')->create());
        $thread = factory('App\Model\Thread')->make();
        $response = $this->post('/threads', $thread->toArray());

        $this->get($response->headers->get('Location'))
            ->assertSee($thread->title)
            ->assertSee($thread->body);
    }

    function test_a_thread_requires_a_title()
    {
        $this->publishThread(['title' => null])
            ->assertSessionHasErrors('title');
    }

    function test_a_thread_requires_a_body()
    {
        $this->publishThread(['body' => null])
            ->assertSessionHasErrors('body');
    }

    function test_a_thread_requires_a_valid_channel()
    {
        factory('App\Model\Channel', 2)->create();
        $this->publishThread(['channel_id' => null])
            ->assertSessionHasErrors('channel_id');

        $this->publishThread(['channel_id' => 999])
            ->assertSessionHasErrors('channel_id');
    }

    public function test_unauthorized_users_may_not_delete_threads()
    {
        $this->withExceptionHandling();
        $thread = factory('App\Model\Thread')->create();

        $this->delete($thread->path())
//            ->assertStatus(403)
            ->assertRedirect('/login')
        ;

        $this->actingAs(factory('App\User')->create());

        $this->delete( $thread->path())
            ->assertStatus(403);
    }

    public function test_authorized_users_can_delete_threads()
    {
        $this->withoutExceptionHandling();
        $this->actingAs(factory('App\User')->create());
        $thread = factory('App\Model\Thread')->create([
            'user_id' => auth()->id()
        ]);
        $reply = factory('App\Model\Reply')->create(['thread_id' => $thread->id]);

        $respoinse = $this->json('DELETE', $thread->path());
        $respoinse->assertStatus(204);
        $this->assertDatabaseMissing('threads',['id' => $thread->id]);
        $this->assertDatabaseMissing('replies',['id' => $reply->id]);
        $this->assertDatabaseMissing('activities',[
            'subject_id' => $thread->id,
            'subject_type' => get_class($thread)
        ]);

        $this->assertDatabaseMissing('activities',[
            'subject_id' => $thread->id,
            'subject_type' => get_class($reply)
        ]);
    }

    public function publishThread($overrides = [])
    {
        $this->withExceptionHandling();
        $this->actingAs(factory('App\User')->create());
        $thread = factory('App\Model\Thread')->make($overrides);
        return $this->post('/threads', $thread->toArray());
    }

}

