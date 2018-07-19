<?php

namespace App\Gof\Visitor\Component;


use App\Gof\Visitor\Processor\ProcessorVisitorInterface;

class Dir extends Component
{
    /**
     * @var array[Component]
     */
    protected $child_dir = [];

    public function add(Component $component){
        $this->child_dir[] = $component;
    }

    public function getChildren(){
        return $this->child_dir;
    }

    public function accept(ProcessorVisitorInterface $visitor){
        $visitor->visitShowName($this);
//        $visitor->visitShowNameDir($this);
    }
}
