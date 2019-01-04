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

    /**
     * @param string $ip 11.22.33.44
     * @return string 11.22.33.45
     */
    public static function increment(string $ip)
    {
        $ip_sep = explode(".", $ip);
        $nextip_sep = [
            (int) $ip_sep[0],
            (int) $ip_sep[1],
            (int) $ip_sep[2],
            (int) $ip_sep[3] + 1
        ];
        
        if($nextip_sep[3] >= 256 ){
            $nextip_sep[3] = 0;
            $nextip_sep[2] += 1;
            if($nextip_sep[2] >= 256 ){
                $nextip_sep[2] = 0;
                $nextip_sep[1] += 1;
                if($nextip_sep[1] >= 256 ){
                    $nextip_sep[1] = 0;
                    $nextip_sep[0] += 1;
                }
            }
        }
        if($nextip_sep[0]>=256){
            $nextip_sep[0] = 1;
        }

        return implode(".",$nextip_sep);
    }
}
