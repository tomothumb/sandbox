<?php

namespace App\Gof\Visitor\Processor;


use App\Gof\Visitor\Component\Component;
use App\Gof\Visitor\Component\Dir;
use App\Gof\Visitor\Component\File;

// Todo
class Csv extends ProcessorVisitor
{
    public function visitShowNameFile(File $component){}
    public function visitShowNameDir(Dir $component){}

}