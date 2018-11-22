<?php

namespace AppBundle\Tests\Controller;

use AppBundle\DataFixtures\ORM\BlogArticleLoader;
use Liip\FunctionalTestBundle\Test\WebTestCase;

//use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;


class blogControllerTest extends WebTestCase
{

    public function testブログ記事一覧が表示されること()
    {
        $this->loadFixtures([
            BlogArticleLoader::class
        ]);

        $client = static::createClient();
        $crawler = $client->request('GET','/blog/');

        $this->assertThat(
            $crawler->filter('li.blog-article')->count(),
            $this->equalTo(20)
        );
    }
}
