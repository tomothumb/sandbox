<?php

namespace App\Service\Whois;

use App\IpRangeAfrinic;
use App\IpRangeApnic;
use App\IpRangeJpnic;
use App\IpRangeLacnic;
use App\IpRangeRipe;
use App\Service\Whois\Parser\WhoisParserInterface;

class WhoisServiceResolver
{

    /**
     * @param $ip_address
     * @return WhoisParserInterface
     */
    public static function resolve($ip_address)
    {

        $iprange = IpRangeJpnic::where('ip_from', "<=", IpUtil::ipv4ToInt($ip_address))
            ->where('ip_to', ">=", IpUtil::ipv4ToInt($ip_address))
            ->get();
        if ($iprange->count() >= 1) {
            return 'Jpnic';
        } else {
            $iprange = IpRangeApnic::where('ip_from', "<=", IpUtil::ipv4ToInt($ip_address))
                ->where('ip_to', ">=", IpUtil::ipv4ToInt($ip_address))
                ->get();
            if ($iprange->count() >= 1) {
                return 'Apnic';
            } else {
                $iprange = IpRangeRipe::where('ip_from', "<=", IpUtil::ipv4ToInt($ip_address))
                    ->where('ip_to', ">=", IpUtil::ipv4ToInt($ip_address))
                    ->get();
                if ($iprange->count() >= 1) {
                    return 'Ripe';
                } else {
                    $iprange = IpRangeAfrinic::where('ip_from', "<=", IpUtil::ipv4ToInt($ip_address))
                        ->where('ip_to', ">=", IpUtil::ipv4ToInt($ip_address))
                        ->get();
                    if ($iprange->count() >= 1) {
                        return 'Afrinic';
                    } else {
                        $iprange = IpRangeLacnic::where('ip_from', "<=", IpUtil::ipv4ToInt($ip_address))
                            ->where('ip_to', ">=", IpUtil::ipv4ToInt($ip_address))
                            ->get();
                        if ($iprange->count() >= 1) {
                            return 'Lacnic';
                        }
                    }
                }
            }

        }
        return 'Default';
    }
}
