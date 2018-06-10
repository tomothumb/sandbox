
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