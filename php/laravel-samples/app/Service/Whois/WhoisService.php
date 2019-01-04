<?php

namespace App\Service\Whois;

use App\Ip;
use App\IpRangeJpnic;
use App\Service\Whois\Parser\DefaultParser;
use App\Service\Whois\Parser\JpnicParser;
use App\Service\Whois\Parser\WhoisParserInterface;
use phpWhois\Whois;

class WhoisService
{
    public $parser;
    public $result;
    public $source;
    public $ip;

    /**
     * WhoisService constructor.
     * @param $parser
     */
    public function __construct(WhoisParserInterface $parser)
    {
        $this->parser = $parser;
    }

    public function lookup($ip)
    {
        $this->ip = $ip;
        $whois = new Whois();
        if ($this->parser->getServer() != false) {
            $whois->useServer('ip', $this->parser->getServer());
        }
        $result = $whois->lookup($ip, true);
        $this->setSource($result);
        $this->parse();
        return $this->result;
    }

    public function setSource($source)
    {
        $this->source = $source;
    }

    public function parse()
    {
        $this->result = $this->parser
            ->parse($this->source)
            ->setIp($this->ip)
            ->get();
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
        return $this;
    }


    public static function hasIp($ip_address)
    {
        $ip = Ip::where('ip_from', "<=", IpUtil::ipv4ToInt($ip_address))
            ->where('ip_to', ">=", IpUtil::ipv4ToInt($ip_address))
            ->get();
        return !($ip->count() == 0);
    }

    public static function addIp($ip_address)
    {
        $WhoisService = new self(self::detectWhoisServer($ip_address));
        $result = $WhoisService->lookup($ip_address);
        $WhoisService->save($result);
    }

    /**
     * @param $ip_address
     * @return WhoisParserInterface
     */
    public static function detectWhoisServer($ip_address)
    {
        $iprange = IpRangeJpnic::where('ip_from', "<=", IpUtil::ipv4ToInt($ip_address))
            ->where('ip_to', ">=", IpUtil::ipv4ToInt($ip_address))
            ->get();
        if ($iprange->count() >= 1) {
            return new JpnicParser();
        }
        return new DefaultParser();
    }

}
