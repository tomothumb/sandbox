<?php

namespace Tests\Unit;

use App\Model\Activity;
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
}
