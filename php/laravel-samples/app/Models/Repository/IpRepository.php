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
            $ip = Ip::where('ip_from', "<=", IpUtil::ipv4ToInt($ip_address))
                ->where('ip_to', ">=", IpUtil::ipv4ToInt($ip_address))
                ->get();
        }
        if($ip->count() > 0){
            return $ip;
        }
        return false;
    }

}
