<?php

namespace App\Service\Crawler;

class TechCrunchCrawler extends CrawlerAbstruct
{
    const TARGET_URL = "https://jp.techcrunch.com/";
    const SITE_TITLE = "TECH CRUNCH";
    const SLEEP = 2;


    public function run()
    {
        $page = $this->client->request("GET", self::TARGET_URL);

        $this->getList($page);
        for ($i = 0; $i < 3; $i++) {
            $page = $this->getNextPage($page);
            $this->getList($page);
        }
    }

    public function getList($document)
    {
        $document->filter('li.river-block')->each(function ($node) {
            if ($node->filter('h2>a')->count() > 0) {
                $this->htmlLink($node->filter('h2>a')->text(), $node->filter('h2>a')->attr('href'));
            }
            return true;

        });
    }

    public function getNextPage($document)
    {
        $link = $document->filter('.river-end .next a')->link();
        sleep(self::SLEEP);
        $next_document = $this->client->click($link);
        $this->append("<li>" . "==============" . $document->filter('.river-end .next a')->attr('href') . "</li>");
        return $next_document;
    }

    public function save()
    {

    }

}