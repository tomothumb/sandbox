<?php

namespace App\Gof\Visitor\Processor;


use App\Gof\Visitor\Component\Component;
use App\Gof\Visitor\Component\Dir;
use App\Gof\Visitor\Component\File;

interface ProcessorVisitorInterface
{
    public function visitShowName(Component $component);
    public function visitShowNameFile(File $component);
    public function visitShowNameDir(Dir $component);
}