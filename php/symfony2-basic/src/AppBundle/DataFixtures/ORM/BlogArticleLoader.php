<?php
namespace AppBundle\DataFixtures\ORM;

use Hautelook\AliceBundle\Alice\DataFixtureLoader;
use Nelmio\Alice\Fixtures;

class BlogArticleLoader extends DataFixtureLoader
{

    /**
     * Returns an array of file paths to fixtures
     *
     * @return array<string>
     */
    protected function getFixtures()
    {
        return array(
            __DIR__ . '/../../Resources/fixtures/BlogArticle.yml',
        );
    }

}