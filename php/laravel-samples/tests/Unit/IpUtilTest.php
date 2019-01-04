<?php

namespace Tests\Unit;

use App\Service\Whois\IpUtil;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class IpUtilTest extends TestCase
{

    public function testExample()
    {
        $this->assertSame(11022033044,IpUtil::ipv4ToInt("11.22.33.44"));
        $this->assertSame(1002003004,IpUtil::ipv4ToInt("1.2.3.4"));
        $this->assertSame(127000000001,IpUtil::ipv4ToInt("127.0.0.1"));
        $this->assertSame(255255255255,IpUtil::ipv4ToInt("255.255.255.255"));
    }
}
