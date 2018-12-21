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

$enum_sample2 = EnumExample::SPADE();
