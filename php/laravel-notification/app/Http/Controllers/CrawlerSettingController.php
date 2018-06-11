<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Goutte\Client;
use GuzzleHttp\Client as GuzzleClient;

class CrawlerSettingController extends Controller
{
    private $client;

    public function getTest()
    {
        $this->client = new Client();
//        $guzzle = new GuzzleClient();
//        $client->setClient($guzzle);
//        $client->setServerParameters(['HTTP_USER_AGENT' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.1 Safari/605.1.15']);
        $page = $this->client->request("GET","https://news.yahoo.co.jp/list/");
        $this->getList($page);
        for ($i=0;$i<5;$i++){
            $page = $this->getNextPage($page);
            $this->getList($page);
        }

//        $page2 = $this->getNextPage($page1);
//        $this->getList($page2);
//        $page3 = $this->getNextPage($page2);
//        $this->getList($page3);
    }

    private function getList($document){
        $document->filter('ul.list li')->each(function($node){
            $this->htmlLink($node->filter('a')->text(), $node->filter('a')->attr('href'));
            return true;
        });
    }
    private function getNextPage($document){
        $link = $document->filter('.ftPager .next a')->link();
        $next_document = $this->client->click($link);
        echo "==============".$document->filter('.ftPager .next a')->attr('href');
        return $next_document;
    }

    private function htmlLink($text,$href)
    {
        echo '<li><a href="'.$href.'">'.trim($text).'</a></li>';
        return;

    }

}
