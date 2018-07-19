<?php

use App\Gof\Composite\Dir;
use App\Gof\Composite\File;

require __DIR__.'/../../../vendor/autoload.php';

class Main
{

    function setup(){
        $root_dir = new Dir("rootdir");
        $this->root_dir = $root_dir;
        $file_1 = new File("file_1");
        $file_2 = new File("file_2");
        $file_3 = new File("file_3");
        $file_4 = new File("file_4");
        $dir_1 = new Dir("dir_1");
        $dir_2 = new Dir("dir_2");
        $dir_3 = new Dir("dir_3");

        $dir_1->add($dir_2);
        $root_dir->add($dir_1);
        $root_dir->add($dir_3);

        $dir_1->add($file_1);
        $dir_2->add($file_2);
        $dir_3->add($file_3);
        $root_dir->add($file_4);
    }

    function run(){
        $this->setup();
        echo "[START]\n";
        $this->root_dir->showName("");
        echo "[END]\n";
    }

}

$composite = new Main();
$composite->run();
