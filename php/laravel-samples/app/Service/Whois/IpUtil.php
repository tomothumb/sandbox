<?php

namespace App\Service\Whois;

class IpUtil
{
    public static function ipv4ToInt($ip)
    {
        $ip_sep = explode(".", $ip);
        $number
            = (int)$ip_sep[0] * 1000 * 1000 * 1000
            + (int)$ip_sep[1] * 1000 * 1000
            + (int)$ip_sep[2] * 1000
            + (int)$ip_sep[3];
        return $number;
    }

    public static function intToIpv4($number)
    {
        $ipv4 = ((int)substr($number, 0, -9)) . "." .
            ((int)substr($number, -9, 3)) . "." .
            ((int)substr($number, -6, 3)) . "." .
            ((int)substr($number, -3, 3));
        return $ipv4;

    }
}
