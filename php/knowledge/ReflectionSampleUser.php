<?php

namespace Knowledge;

class ReflectionSampleUser{
    public $name;
    private $age;
    const COUNTRY = 'Japan';

    /**
     * ReflectionSampleUser constructor.
     * @param $name
     * @param $age
     */
    public function __construct($name, $age)
    {
        $this->name = $name;
        $this->age = $age;
    }

    public function sayHello(){
        echo "Hello, I'm {$this->name} \n";
    }

}