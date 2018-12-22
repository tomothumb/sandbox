<?php

include_once 'Enum.php';

final class EnumExample extends Enum
{
    const SPADE = 'spade';
    const HEART = 'heart';
    const CLUB = 'club';
    const DIAMOND = 'diamond';
}

$enum_sample = new EnumExample(EnumExample::SPADE);
echo $enum_sample;
echo $enum_sample->valueOf();

echo PHP_EOL;

$enum_sample2 = EnumExample::SPADE();
echo $enum_sample2;
echo $enum_sample2->valueOf();

echo PHP_EOL;

try{
    $enum_sample3 = EnumExample::SPADEEEE("abc","def");
    echo $enum_sample3;
    echo $enum_sample3->valueOf();

}catch (Exception $exception){
    var_dump($exception->getMessage());
}

echo PHP_EOL;
