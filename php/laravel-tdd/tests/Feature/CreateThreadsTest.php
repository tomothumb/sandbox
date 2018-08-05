<?php

namespace Tests\Feature;


use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CreateThreadsTest extends TestCase
{

    function test_gueast_can_not_create_new_forum_threads()
    {
        $this->withoutExceptionHandling();
        $this->expectException('Illuminate\Auth\AuthenticationException');

        $thread = factory('App\Model\Thread')->make();
        $response = $this->post('/threads', $thread->toArray());
        $this->withExceptionHandling();
        $response->assertStatus(302);


    }

    function test_an_authenticated_user_can_create_new_forum_threads()
    {
        $this->actingAs(factory('App\User')->create());
        $thread = factory('App\Model\Thread')->make();
        $this->post('/threads', $thread->toArray());
        $this->get($thread->path())
            ->assertSee($thread->title)
            ->assertSee($thread->body)
        ;
    }
}
