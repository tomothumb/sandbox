<?php

namespace Tests\Unit;

use App\Service\Whois\IpUtil;
use Tests\TestCase;

class IpUtilTest extends TestCase
{

    public function testIpv4ToInt()
    {
        $this->assertSame(11022033044, IpUtil::ipv4ToInt("11.22.33.44"));
        $this->assertSame(1002003004, IpUtil::ipv4ToInt("1.2.3.4"));
        $this->assertSame(127000000001, IpUtil::ipv4ToInt("127.0.0.1"));
        $this->assertSame(255255255255, IpUtil::ipv4ToInt("255.255.255.255"));
    }

    public function testIntToIpv4()
    {
        $this->assertSame("11.22.33.44", IpUtil::intToIpv4(11022033044));
        $this->assertSame("1.2.3.4", IpUtil::intToIpv4(1002003004));
        $this->assertSame("127.0.0.1", IpUtil::intToIpv4(127000000001));
        $this->assertSame("255.255.255.255", IpUtil::intToIpv4(255255255255));
    }

    public function testIncrementIp()
    {
        $this->assertSame("1.1.1.2", IpUtil::increment("1.1.1.1"));
        $this->assertSame("1.1.1.10", IpUtil::increment("1.1.1.9"));
        $this->assertSame("1.1.2.0", IpUtil::increment("1.1.1.255"));
        $this->assertSame("1.2.0.0", IpUtil::increment("1.1.255.255"));
        $this->assertSame("2.0.0.0", IpUtil::increment("1.255.255.255"));
        $this->assertSame("2.0.0.1", IpUtil::increment("2.0.0.0"));
        $this->assertSame("10.0.0.0", IpUtil::increment("9.255.255.255"));
    }
}
