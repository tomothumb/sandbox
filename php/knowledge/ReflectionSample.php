<?php

//namespace Knowledge;

require_once 'ReflectionSampleUser.php';


$reflClass = new ReflectionClass('Knowledge\ReflectionSampleUser');

echo sprintf("%-20s: %s\n", 'getName', $reflClass->getName());
echo sprintf("%-20s: %s\n", 'getNamespaceName', $reflClass->getNamespaceName());
echo sprintf("%-20s: %s\n", 'getShortName', $reflClass->getShortName());
echo sprintf("%-20s: %s\n", 'getFileName', $reflClass->getFileName());

var_dump(
    $reflClass->getConstants()
);
$user = $reflClass->newInstance('Michel', 20);
$user->sayHello();
var_dump($user);
