<?php

namespace App\Models\Repository;

use App\Ip;
use App\Service\Whois\IpUtil;

class IpRepository
{
    public $repository = [];

    public function __construct(){}

    public static function find(string $ip_address){
        $ip = Ip::where('ip_from', "=", IpUtil::ipv4ToInt($ip_address))->get();

        if($ip->count() == 0){
            // $ip1 = Ip::where('ip_from', "<=", IpUtil::ipv4ToInt($ip_address))->get();
            // $ip2 = Ip::whereRaw('ip_from <= :from', ['from' => IpUtil::ipv4ToInt($ip_address)])->get();
            $ip3 = Ip::whereRaw('ip_from <= '.IpUtil::ipv4ToInt($ip_address).' AND ip_to >= '.IpUtil::ipv4ToInt($ip_address))->get();
            $ip = $ip3;
        }


        if($ip->count() > 0){
            return $ip;
        }
        return false;
    }

}
