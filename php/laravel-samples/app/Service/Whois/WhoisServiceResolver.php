<?php

namespace App\Service\Whois;

use App\IpRangeApnic;
use App\IpRangeJpnic;
use App\Service\Whois\Request\ApnicRequest;
use App\Service\Whois\Request\JpnicRequest;
use App\Service\Whois\Request\DefaultRequest;
use App\Service\Whois\Request\WhoisRequestInterface;
use App\Service\Whois\Parser\DefaultParser;
use App\Service\Whois\Parser\JpnicParser;
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
            }
        }
        return 'Default';
    }
}
