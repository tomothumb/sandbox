<?php

namespace App\Service\Whois\Parser;

class JpnicParser extends Parser implements WhoisParserInterface
{
    const SERVER = 'whois.nic.ad.jp';

    protected $whois;

    public function getServer(){
        return self::SERVER;
    }

    public function parse($source)
    {
        $this->whois = $source;
        return $this;
    }

    public function get()
    {
        return $this->whois;
    }

}

