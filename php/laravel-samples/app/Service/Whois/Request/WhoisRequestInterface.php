<?php

namespace App\Service\Whois\Request;

interface WhoisRequestInterface{
    public function lookup($ipv4);
}

