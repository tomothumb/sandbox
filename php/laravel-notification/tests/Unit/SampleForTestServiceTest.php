<?php

namespace Tests\Unit;

use App\Service\SampleForTest\InnerSample;
use App\Service\SampleForTest\OuterSample;
use Tests\TestCase;

class SampleForTestServiceTest extends TestCase
{

    public function testBasic()
    {
        $this->assertTrue(true);
    }


    public function testBasic2()
    {
        $inner = new InnerSample();
        $outer = new OuterSample($inner);
        $this->assertSame("hello, world", $outer->run());
    }


    public function testMockey()
    {
        $inner_mock = \Mockery::mock('App\Service\SampleForTest\InnerSample');
        $inner_mock
            ->shouldReceive('hello')
            ->andReturn('hello, world');

        $outer = new OuterSample($inner_mock);
        $this->assertSame("hello, world", $outer->run());

    }

}
