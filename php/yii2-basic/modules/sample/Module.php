<?php

namespace app\modules\sample;

/**
 * sample module definition class
 */
class Module extends \yii\base\Module
{
    /**
     * {@inheritdoc}
     */
    public $controllerNamespace = 'app\modules\sample\controllers';

    /**
     * {@inheritdoc}
     */
    public function init()
    {
        parent::init();

        // custom initialization code goes here
        if (Yii::$app instanceof \yii\console\Application) {
            $this->controllerNamespace = 'app\modules\sample\commands';
        }
    }
}
