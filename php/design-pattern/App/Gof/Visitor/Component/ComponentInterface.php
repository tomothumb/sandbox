<?php

namespace App\Gof\Visitor\Component;


use App\Gof\Visitor\Processor\ProcessorVisitorInterface;

interface ComponentInterface{
    public function accept(ProcessorVisitorInterface $visitor);

}