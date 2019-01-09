<?php

namespace App\Service\Whois\Parser;

interface WhoisParserInterface
{
    public function setSource($source);
    public function parse();
    public function setIp($ip);
    public function get();

    public function setNetwork();
    public function setOrganization();
    public function setOrganizationEn();
    public function setIpRange();
}
