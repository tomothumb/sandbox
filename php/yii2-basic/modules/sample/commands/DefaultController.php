<?php

namespace app\modules\sample\commands;

use app\modules\sample\models\Dummy;
use yii\console\Controller;


/**
 * http://localhost/sample/default/index
 * php yii <module>/<controller>/<method> $arg
 *
 * Class DefaultController
 * @package app\modules\sample\commands
 */
class DefaultController extends Controller
{
    /**
     * Renders the index view for the module
     * @return string
     */
    public function actionIndex()
    {
        echo 'default/index';
    }

    public function actionEcho1(){
        echo 1;
    }

    public function actionArg($arg){
        echo $arg;
    }

    public function actionModeldemo()
    {
        $d = new Dummy();
        $d->prop1 = 'p99';
        $d->prop2 = 'p100';
        echo $d->prop1;
    }
}