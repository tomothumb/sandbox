<?php

namespace App;

use App\Service\Whois\IpUtil;
use Illuminate\Database\Eloquent\Model;

class Ip extends Model
{
    protected $fillable = ['from', 'to', 'org'];

    public function getIpFromAttribute($value)
    {
        return IpUtil::intToIpv4($value);
    }

    public function getIpToAttribute($value)
    {
        return IpUtil::intToIpv4($value);
    }
}
