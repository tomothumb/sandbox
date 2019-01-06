<?php

use App\Models\Repository\IpRepository;
use App\Service\Whois\Parser\JpnicParser;
use App\Service\Whois\WhoisService;
use Illuminate\Foundation\Inspiring;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->describe('Display an inspiring quote');

Artisan::command('ipv4crawl',function(){
    $nextip = \App\Service\Whois\WhoisService::incrementIpv4Counter();

    if($ip_addreses = IpRepository::find($nextip)){
        $ip_model = $ip_addreses->first();
        $nextip = \App\Service\Whois\WhoisService::setIpv4Counter($ip_model->ip_to);
        echo "EXIST IP ADDRESS [IP RANGE FINISH]:{$nextip}\n";
    }else{
//        $parser = WhoisService::detectWhoisServer($nextip);
//        if($parser instanceof JpnicParser){
            $ip_obj = WhoisService::addIp($nextip);
            if($ip_obj->ip_to != "" ){
                $nextip = \App\Service\Whois\WhoisService::setIpv4Counter($ip_obj->ip_to);
            }
//        }
        echo "{$nextip}\n";
    }
});

Artisan::command('ipv4whois {ipv4}',function($ipv4){
    if(! WhoisService::hasIp($ipv4)){
        $parser = WhoisService::detectWhoisServer($ipv4);
        $ip_obj = WhoisService::addIp($ipv4);
    }
    echo "{$ipv4}\n";
});
