<?php

namespace App\Service\Whois\Parser;

interface WhoisParserInterface
{
    public function parse($source);
    public function setIp($ip);
    public function getServer();
    public function get();
}
