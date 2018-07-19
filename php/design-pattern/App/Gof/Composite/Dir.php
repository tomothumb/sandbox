<?php

namespace App\Gof\Composite;


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

    public function showName($prefix){
        echo $prefix."/". $this->getName() . "\n";

        $prefix = $prefix."/". $this->getName();

        //再起処理
        foreach ($this->getChildren() as $child_dir){
            $child_dir->showName($prefix);
        }
    }

}