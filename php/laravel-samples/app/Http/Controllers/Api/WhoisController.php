<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Whois;
use App\Ip;
use App\Models\Repository\IpRepository;
use App\Service\Whois\WhoisService;

class WhoisController extends Controller
{
    public function lookup(string $ipv4)
    {
        if($ip_addreses = IpRepository::find($ipv4)){
            $ip_model = $ip_addreses->first();
//            dd($ip_addreses->first());
            return new Whois($ip_addreses->first());
        }

        $parser = WhoisService::detectWhoisServer($ipv4);
//        if($parser instanceof JpnicParser){
            $ip_obj = WhoisService::addIp($ipv4);
            if($ip_obj instanceof Ip){
                return new Whois($ip_obj);
            }
//        }
        return ["data"=>[]];
    }

    public function forcelookup(string $ipv4){
        $parser = WhoisService::detectWhoisServer($ipv4);
//        if($parser instanceof JpnicParser){
        $ip_obj = WhoisService::addIp($ipv4);
        if($ip_obj instanceof Ip){
            return new Whois($ip_obj);
        }
//        }
        return ["data"=>[]];
    }
}
