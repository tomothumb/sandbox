<?php

namespace App\Service\Whois\Request;

use phpWhois\Whois;

class DefaultRequest implements WhoisRequestInterface
{
    public function getServer()
    {
        return "";
    }

    public function lookup($ipv4)
    {
        $whois = new Whois();
        if ($this->getServer() != "") {
            $whois->useServer('ip', $this->getServer());
        }
        return $whois->lookup($ipv4, true);
    }
}


