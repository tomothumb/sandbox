<?php

namespace App\Http\Controllers;

use App\Service\Crawler\YahooNewsCrawler;
use Illuminate\Http\Request;

class CrawlerSettingController extends Controller
{

    public function getYahooNews()
    {
        $YahooNewsCrawler = new YahooNewsCrawler();
        $YahooNewsCrawler->run();
        $hoge = $YahooNewsCrawler->getResult();
        echo($hoge);
        return 1;
    }

    public function getYahooNewsByPhantomjs()
    {

        $client = \JonnyW\PhantomJs\Client::getInstance();
        $client->getEngine()->setPath(env('PHANTOMJS_PATH'));


        $request = $client->getMessageFactory()->createRequest('http://yahoo.co.jp', 'GET');
        $response = $client->getMessageFactory()->createResponse();
        $client->send($request, $response);
        dump($response->getStatus());
        if(in_array($response->getStatus(), [200,301])) {
            dump( $response->getContent());
        }
        return 1;
    }

}
