<?php

namespace App\Http\Resources;

use App\Ip;
use Illuminate\Http\Resources\Json\Resource;

class Whois extends Resource
{
    /**
     * Whois constructor.
     */
    public function __construct(Ip $ip)
    {
        parent::__construct($ip);
        return $this;
    }


    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
