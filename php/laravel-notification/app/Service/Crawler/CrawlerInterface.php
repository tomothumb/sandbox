<?php

namespace App\Service\Crawler;

interface CrawlerInterface
{
    public function run();
    public function save();
}