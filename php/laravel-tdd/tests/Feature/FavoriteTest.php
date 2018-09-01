<?php

namespace Tests\Feature;

use App\Model\Reply;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class FavoriteTest extends TestCase
{

    use DatabaseMigrations;

    public function test_guest_can_not_favorite_anything()
    {
        $this->withExceptionHandling();
        $reply = factory(Reply::class)->create();
        $this->post('/replies/' . $reply->id . '/favorites')
            ->assertRedirect('/login');
    }

    public function test_an_authenticated_user_can_favorite_any_reply()
    {
        $this->withExceptionHandling();
        $this->be($user = factory('App\User')->create());
        $reply = factory(Reply::class)->create();
        $this->post('/replies/' . $reply->id . '/favorites');
        $this->assertCount(1, $reply->favorites);
    }

    public function test_an_authenticated_user_can_unfavorite_a_reply()
    {
        $this->withoutExceptionHandling();
        $this->be($user = factory('App\User')->create());
        $reply = factory(Reply::class)->create();
        $this->post('/replies/' . $reply->id . '/favorites');
        $this->assertCount(1, $reply->favorites);

        $this->delete('/replies/' . $reply->id . '/favorites');
        $this->assertCount(0, $reply->fresh()->favorites);
    }

    public function test_an_authenticated_user_may_only_favorite_a_reply_once()
    {
        $this->withoutExceptionHandling();
        $this->be($user = factory('App\User')->create());
        try {
            $reply = factory(Reply::class)->create();
            $this->post('/replies/' . $reply->id . '/favorites');
            $this->post('/replies/' . $reply->id . '/favorites');
        } catch (\Exception $e) {
            $this->fail('Did not expect to insert the same recprd set twice.');
        }
        $this->assertCount('1', $reply->favorites);
    }

}
