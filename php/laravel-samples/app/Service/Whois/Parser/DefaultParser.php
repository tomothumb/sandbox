<?php

namespace App\Service\Whois\Parser;

class DefaultParser extends Parser implements WhoisParserInterface
{

    protected $whois;

    public function getServer()
    {
        return false;
    }

    public function parse($source)
    {
        $this->whois = $source;
        return $this;
    }

}

