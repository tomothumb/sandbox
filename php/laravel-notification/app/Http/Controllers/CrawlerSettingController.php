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

}
