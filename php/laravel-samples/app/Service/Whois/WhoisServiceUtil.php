<?php

namespace App\Service\Whois;

use App\Ip;

class WhoisServiceUtil
{
    const FILEPATH_COUNTER = 'database/data/ipv4_counter.txt';

    public static function hasIp($ip_address)
    {
        $ip = Ip::where('ip_from', "=", IpUtil::ipv4ToInt($ip_address))->get();
        if($ip->count() == 0){
            $ip = Ip::where('ip_from', "<=", IpUtil::ipv4ToInt($ip_address))
                ->where('ip_to', ">=", IpUtil::ipv4ToInt($ip_address))
                ->get();
        }
        return !($ip->count() == 0);
    }

    public static function incrementIpv4Counter($ip = null)
    {
        if($ip == null){
            $file_path = base_path(self::FILEPATH_COUNTER);
            // Read File
            $ip = file_get_contents($file_path);
        }
        $next_ip = \App\Service\Whois\IpUtil::increment($ip);

        return self::setIpv4Counter($next_ip);
    }

    public static function setIpv4Counter($next_ip)
    {
        $file_path = base_path(self::FILEPATH_COUNTER);

        // Write File
        file_put_contents($file_path, $next_ip);
        return $next_ip;
    }
}
