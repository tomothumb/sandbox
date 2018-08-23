<?php

namespace Tests\Unit;

use App\Model\Activity;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class ActivityTest extends TestCase
{
    use DatabaseMigrations;

    public function test_it_records_activity_when_a_thread_is_created()
    {
        $this->actingAs(factory('App\User')->create());
        $thread = factory('App\Model\Thread')->create();

        $this->assertDatabaseHas('activities', [
            'user_id' => auth()->id(),
            'subject_id' => $thread->id,
            'subject_type' => 'App\Model\Thread',
            'type' => 'created_thread',
        ]);

        $activity = Activity::first();
        $this->assertEquals($activity->subject->id, $thread->id);
    }

    public function test_it_records_activity_when_a_reply_is_created()
    {
        $this->actingAs(factory('App\User')->create());
        $reply = factory('App\Model\Reply')->create();

        $this->assertEquals(2, Activity::count());


        $this->assertDatabaseHas('activities', [
            'user_id' => auth()->id(),
            'subject_id' => $reply->id,
            'subject_type' => 'App\Model\Reply',
            'type' => 'created_reply',
        ]);
        $activity = Activity::first();
        $this->assertEquals($activity->subject->id, $reply->id);
    }

    public function test_it_fetches_a_feed_for_any_user()
    {
        $this->actingAs(factory('App\User')->create());
        factory('App\Model\Thread',2)->create([
            'user_id' => auth()->id()
        ]);
        auth()->user()->activities()->first()->update([
            'created_at' => Carbon::now()->subWeek()
        ]);
        $feed = Activity::feed(auth()->user());


        $this->assertTrue($feed->keys()->contains(
            Carbon::now()->format("Y-m-d")
        ));

        $this->assertTrue($feed->keys()->contains(
            Carbon::now()->subWeek()->format("Y-m-d")
        ));


    }
}
