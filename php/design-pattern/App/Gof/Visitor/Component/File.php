<?php

namespace App\Gof\Visitor\Component;


use App\Gof\Visitor\Processor\ProcessorVisitorInterface;

class File extends Component
{
    public function accept(ProcessorVisitorInterface $visitor){
        $visitor->visitShowName($this);
//        $visitor->visitShowNameFile($this);
    }
}