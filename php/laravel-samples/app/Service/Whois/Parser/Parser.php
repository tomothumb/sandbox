<?php

namespace App\Service\Whois\Parser;

class Parser implements WhoisParserInterface
{

    const LABEL_NO = 'This network range is not allocated to';
    protected $whois;

    public function getServer()
    {
    }

    public function parse($source)
    {
        $this->whois = $source;
        return $this;
    }

    public function setIp($ip)
    {
        $this->whois['parseddata']['ip'] = $ip;
        return $this;
    }

    public function get()
    {
        return $this->whois;
    }
}
