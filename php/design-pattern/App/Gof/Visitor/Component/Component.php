<?php

namespace App\Gof\Visitor\Component;


use App\Gof\Visitor\Processor\ProcessorVisitorInterface;

abstract class Component implements ComponentInterface
{
    public $name;
    public function __construct($name)
    {
        $this->name = $name;
    }
    public function getName(){
        return $this->name;
    }
}