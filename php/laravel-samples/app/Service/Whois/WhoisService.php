<?php

namespace App\Service\Whois;

use App\Ip;
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
        if ($this->parser->getServer()) {
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

        if ($result['parseddata']['ip_range']
            && $result['parseddata']['ip_range']['from']
        ) {
            $ip = Ip::firstOrNew([
                'ip_from' => $result['parseddata']['ip_range']['from']
            ]);
            $ip->ip_from = ($result['parseddata']['ip_range']['from']) ?
                $result['parseddata']['ip_range']['from'] : "";

            $ip->ip_to = ($result['parseddata']['ip_range']['to']) ?
                $result['parseddata']['ip_range']['to'] : "";
        }
        $ip->org = $result['parseddata']['organization'];
        $ip->save();
        return $this;
    }

}