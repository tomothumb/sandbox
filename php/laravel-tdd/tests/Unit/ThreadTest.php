<?php

namespace Tests\Unit;


use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ThreadTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp()
    {
        parent::setUp();
        $this->thread = factory('App\Model\Thread')->create();
    }


    public function test_a_thread_has_replies()
    {

        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $this->thread->replies);
//        $response = $this->get('/threads/',$this->thread->id)
//            ->assertSee()
    }

    public function test_a_thread_has_a_creator()
    {

        $this->assertInstanceOf('App\User', $this->thread->user);

    }
}
