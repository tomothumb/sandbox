<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Goutte\Client;
use GuzzleHttp\Client as GuzzleClient;

class CrawlerSettingController extends Controller
{

    public function getTest()
    {
        $client = new Client();
//        $guzzle = new GuzzleClient();
//        $client->setClient($guzzle);
//        $client->setServerParameters(['HTTP_USER_AGENT' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.1 Safari/605.1.15']);

        $crawler = $client->request("GET","https://news.yahoo.co.jp/");
        $crawler->filter('.topics li')->each(function($node){
            echo '<li>';
            echo $node->filter('a')->text() ."<br>";
            echo $node->filter('a')->attr('href') ."<br>";
            echo '</li>';
            return true;
        });
    }

}
