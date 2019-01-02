<?php

namespace App\Service\Whois\Parser;

interface WhoisParserInterface
{
    public function parse($source);
    public function getServer();
    public function get();


}
