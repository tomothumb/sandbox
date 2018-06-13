<?php

namespace App\Service\Crawler;

class YahooNewsCrawler extends CrawlerAbstruct
{
    const TARGET_URL = "https://news.yahoo.co.jp/list/";
    const SITE_TITLE = "YAHOO JAPAN NEWS";
    const SLEEP = 2;


    public function run()
    {
//        $guzzle = new GuzzleClient();
//        $client->setClient($guzzle);
//        $client->setServerParameters(['HTTP_USER_AGENT' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.1 Safari/605.1.15']);
        $page = $this->client->request("GET", self::TARGET_URL);

        $this->getList($page);
        for ($i = 0; $i < 3; $i++) {
            $page = $this->getNextPage($page);
            $this->getList($page);
        }
    }

    public function getList($document)
    {
        $document->filter('ul.list li')->each(function ($node) {
            if ($node->filter('h2>a')->count() > 0) {
                $this->htmlLink($node->filter('a')->text(), $node->filter('a')->attr('href'));
            }
            return true;
        });
    }

    public function getNextPage($document)
    {
        $link = $document->filter('.ftPager .next a')->link();
        sleep(self::SLEEP);
        $next_document = $this->client->click($link);
        $this->append("<li>" . "==============" . $document->filter('.ftPager .next a')->attr('href') . "</li>");
        return $next_document;
    }

    public function save()
    {

    }

}