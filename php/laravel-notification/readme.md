
### goutte スクレイピング

```

$crawler = $client->request("GET", "https://news.yahoo.co.jp/");

// Basic Usage
dump( $crawler->filter('h1')->text() );

// Select Specific Node
dump( $crawler->filter('.topics li')->eq(2)->text() );

// Multiple
$crawler->filter('.topics li')->each(function( $node ){
    dump( $node->filter('a')->html());
    dump( $node->filter('a')->text());
    dump( $node->filter('a')->attr('href'));
});


// ページ遷移
$link = $crawler->filter('a#somelink')->link();
$nextdocument = $client->click($link);


```

### PhantomJS スクレイピング

You need set the Path PhantomJS installed.
```
$client->getEngine()->setPath(env('PHANTOMJS_PATH'));
```

http://jonnnnyw.github.io/php-phantomjs/

```
/.env
PHANTOMJS_PATH=/path/to/phantomjs

/sample.php

<?php
$client = \JonnyW\PhantomJs\Client::getInstance();
$client->getEngine()->setPath(env('PHANTOMJS_PATH'));
$request = $client->getMessageFactory()->createRequest('http://yahoo.co.jp', 'GET');
$response = $client->getMessageFactory()->createResponse();
$client->send($request, $response);
if($response->getStatus() == 200) {
    echo $response->getContent();
}
```