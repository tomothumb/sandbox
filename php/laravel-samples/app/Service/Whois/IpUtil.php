<?php

namespace App\Service\Whois;

class IpUtil
{
    public static function ipv4ToInt($ip)
    {
        $ip_sep = explode(".", $ip);
        $number
            = (int) $ip_sep[0] * 1000 * 1000 * 1000
            + (int) $ip_sep[1] * 1000 * 1000
            + (int) $ip_sep[2] * 1000
            + (int) $ip_sep[3]
        ;
        return $number;
    }
}
