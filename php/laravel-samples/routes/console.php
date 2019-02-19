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

    // 通常
    $nextip = \App\Service\Whois\WhoisServiceUtil::incrementIpv4Counter();

    if($ip_addreses = IpRepository::find($nextip)){
        $ip_model = $ip_addreses->first();
        $nextip = \App\Service\Whois\WhoisServiceUtil::setIpv4Counter($ip_model->ip_to);
        echo "EXIST IP ADDRESS [IP RANGE FINISH]:{$nextip}\n";
    }else{
        $ip_obj = WhoisService::addIp($nextip);
        if($ip_obj->ip_to != "" ){
            $nextip = \App\Service\Whois\WhoisServiceUtil::setIpv4Counter($ip_obj->ip_to);
        }
        echo "{$nextip}\n";
    }

    // CSV
    for($i=0;$i<100;$i++){
        $ipv4 = getNextIpv4FromCsv();
        if($ipv4 === false){ return; }
        echo "{$ipv4}\n";
        if(! WhoisService::hasIp($ipv4)){
            $ip_obj = WhoisService::addIp($ipv4);
            echo "DONE\n";
            return;
        }
    }

    echo "NO RESULT\n";

});

Artisan::command('ipv4whois {ipv4}',function($ipv4){
    $ip_addreses = IpRepository::find($ipv4);
    if(! WhoisService::hasIp($ipv4)){
        $ip_obj = WhoisService::addIp($ipv4);
    }
    echo "{$ipv4}\n";
});

function getNextIpv4FromCsv(){
    $file_path = base_path('database/data/ipv4_crawl_list.txt');
    // Read File
    $lines = file($file_path);

    try{
        $ipv4 = trim($lines[0]);
        // Update FIle
        unset($lines[0]);
        file_put_contents($file_path, $lines);
        return $ipv4;

    } catch (\Exception $e){
        return false;
    }

}

Artisan::command('ipv4crawlcsv',function(){

    $ipv4 = getNextIpv4FromCsv();
    echo "{$ipv4}\n";
    if(! WhoisService::hasIp($ipv4)){
        $ip_obj = WhoisService::addIp($ipv4);
    }
    echo "DONE\n";
});

Artisan::command('rdap',function(){
    WhoisService::addIp('223.2.0.1');
    return true;
});


Artisan::command('testtest',function(){
    WhoisService::addIp('2.2.1.1'); // Ripe
    WhoisService::addIp('197.200.1.1'); // AfriNic
    WhoisService::addIp('181.100.0.16'); // LacNic

    WhoisService::addIp('205.251.150.162');

    return true;
});

Artisan::command('dbdump',function(){
});

