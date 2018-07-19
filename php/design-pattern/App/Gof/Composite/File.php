<?php

namespace App\Gof\Composite;


class File extends Component
{
    public function add(Component $component){
        throw new \Exception();
    }

    public function showName($prefix)
    {
        echo $prefix."/". $this->getName() . "\n";
    }
}