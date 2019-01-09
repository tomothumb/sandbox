<?php

namespace App\Service\Whois\Request;

use phpWhois\Whois;

class JpnicRequest extends DefaultRequest
{
    const SERVER = 'whois.nic.ad.jp';

    public function getServer(){
        return self::SERVER;
    }

}

