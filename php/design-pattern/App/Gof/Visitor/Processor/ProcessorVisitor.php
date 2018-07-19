<?php

namespace App\Gof\Visitor\Processor;


use App\Gof\Visitor\Component\Component;
use App\Gof\Visitor\Component\Dir;
use App\Gof\Visitor\Component\File;
use Exception;

abstract class ProcessorVisitor
{
    public function visitShowName(Component $component)
    {
        if ($component instanceof Dir) {
            $this->visitShowNameDir($component);
        } else if ($component instanceof File) {
            $this->visitShowNameFile($component);
        }else{
            throw new Exception('ERROR!');
        }
    }

    public function visitShowNameFile(File $component){}
    public function visitShowNameDir(Dir $component){}

}