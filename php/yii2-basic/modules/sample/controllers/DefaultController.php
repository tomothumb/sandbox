<?php

namespace app\modules\sample\controllers;

use app\modules\sample\models\Dummy;
use yii\web\Controller;

/**
 * URL
 * http://localhost/sample/default/index
 * http://localhost/<module>/<controller>/<method>
 * Default controller for the `sample` module
 */
class DefaultController extends Controller
{
    /**
     * Renders the index view for the module
     * @return string
     */
    public function actionIndex()
    {
        return $this->render('index');
    }
    public function actionModeldemo(){
        $d = new Dummy();
        $d->prop1 = 'p99';
        $d->prop2 = 'p100';
        return $this->render('dummy',[
            'd' => $d,
        ]);
    }
}
