<?php

namespace App\Gof\Visitor\Processor;

use App\Gof\Visitor\Component\Component;
use App\Gof\Visitor\Component\Dir;
use App\Gof\Visitor\Component\File;
use Exception;

class Stdout extends ProcessorVisitor
{
    public $prefix = "";

    public function setNewPrefix($filename)
    {
        $this->prefix = $this->prefix."/".$filename;
    }


    public function visitShowNameFile(File $component){
        echo $this->prefix."/". $component->getName()."\n";
    }

    public function visitShowNameDir(Dir $component){
        echo $this->prefix."/". $component->getName() . "\n";

        $this->setNewPrefix($component->getName());

        //再起処理
        foreach ($component->getChildren() as $child_dir){
            $child_dir->accept($this);
        }
    }

}