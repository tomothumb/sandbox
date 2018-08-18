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

    public function test_guests_cannot_delete_threads()
    {
        $this->withoutExceptionHandling();
        $thread = factory('App\Model\Thread')->create();

        $respoinse = $this->json('DELETE', $thread->path());
        $respoinse->assertRedirect('/login');
    }

    public function test_threads_may_only_be_deleted_by_those_who_have_permission()
    {
        //TODO:
//        $this->assertTrue(true);
    }

    public function test_a_thread_can_be_deleted()
    {
        $this->withoutExceptionHandling();
        $this->actingAs(factory('App\User')->create());
        $thread = factory('App\Model\Thread')->create();
        $reply = factory('App\Model\Reply')->create(['thread_id' => $thread->id]);

        $respoinse = $this->json('DELETE', $thread->path());
        $respoinse->assertStatus(204);
        $this->assertDatabaseMissing('threads',['id' => $thread->id]);
        $this->assertDatabaseMissing('replies',['id' => $reply->id]);
    }

    public function publishThread($overrides = [])
    {
        $this->withExceptionHandling();
        $this->actingAs(factory('App\User')->create());
        $thread = factory('App\Model\Thread')->make($overrides);
        return $this->post('/threads', $thread->toArray());
    }

}

