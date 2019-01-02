<?php

namespace App\Service\Whois\Parser;

class Parser implements WhoisParserInterface
{
    protected $whois;
    public function getServer(){

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
