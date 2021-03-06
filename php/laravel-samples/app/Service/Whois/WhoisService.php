<?php

namespace App\Service\Whois;

use App\Ip;
use App\Service\Whois\Parser\WhoisParserInterface;
use App\Service\Whois\Request\WhoisRequestInterface;
use phpWhois\Whois;

class WhoisService
{
    public $parser;
    public $request;

    public $result;
    public $source;
    public $ip;

    /**
     * WhoisService constructor.
     * @param $parser
     */
    public function __construct(WhoisRequestInterface $request, WhoisParserInterface $parser)
    {
        $this->request = $request;
        $this->parser = $parser;
    }

    public static function factory($ip_address){
        $whoisServerPrefix = WhoisServiceResolver::resolve($ip_address);
        $parser_class_name = "App\Service\Whois\Parser\\".$whoisServerPrefix."Parser";
        $request_class_name = "App\Service\Whois\Request\\".$whoisServerPrefix."Request";
        $parser = new $parser_class_name($ip_address);
        $request = new $request_class_name($ip_address);
        return new self($request,$parser);
    }

    public function lookup($ip)
    {
        $this->ip = $ip;
        $response = $this->request->lookup($ip);
        $this->result = $this->parser->setSource($response)->parse()->get();
        return $this->result;
    }


    public function save($result = null)
    {
        if ($result == null) {
            $result = $this->result;
        }

        if (isset($result['parseddata']['ip_range'])
            && isset($result['parseddata']['ip_range']['from'])
        ) {
            $ip = Ip::firstOrNew([
                'ip_from' => IpUtil::ipv4ToInt($result['parseddata']['ip_range']['from'])
            ]);
            $ip->ip_from = isset($result['parseddata']['ip_range']['from']) ?
                IpUtil::ipv4ToInt($result['parseddata']['ip_range']['from']) : "";

            $ip->ip_to = isset($result['parseddata']['ip_range']['to']) ?
                IpUtil::ipv4ToInt($result['parseddata']['ip_range']['to']) : "";
        }
        if (isset($result['parseddata']['organization'])
        ) {
            $ip->org = isset($result['parseddata']['organization']) ?
                $result['parseddata']['organization'] : "";
        }
        $ip->save();
        return $ip;
    }

    public static function addIp($ip_address)
    {

        $WhoisService = self::factory($ip_address);
        $result = $WhoisService->lookup($ip_address);
        return $WhoisService->save($result);
    }

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

}
