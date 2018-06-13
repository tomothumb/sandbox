<?php

namespace App\Service\Crawler;

use Goutte\Client;

abstract class CrawlerAbstruct implements CrawlerInterface
{

    const TARGET_URL = "";
    const SITE_TITLE = "";

    protected $client;
    protected $buffer = "";

    public function __construct()
    {
        $this->append("<h1>".self::SITE_TITLE."</h1>");
        $this->client = new Client();
    }

    public function run(){

    }

    public function save(){

    }

    protected function htmlLink($text,$href)
    {
        $this->buffer .= '<li><a href="'.$href.'">'.trim($text).'</a></li>';
        return $this;
    }

    protected function append($html)
    {
        $this->buffer .= $html;
        return $this;
    }

    public function output(){
        echo $this->buffer;
        return $this;
    }
    public function getResult(){
        return $this->buffer;
    }

}