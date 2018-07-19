<?php

namespace App\Gof\Composite;


abstract class Component implements ComponentInterface
{
    public $prefix = "";
    public $name;
    public function __construct($name)
    {
        $this->name = $name;
    }
    public function getName(){
        return $this->name;
    }

}