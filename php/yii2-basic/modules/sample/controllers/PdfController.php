<?php

namespace app\modules\batchpdf\controllers;

use app\modules\batchpdf\models\PdfModel;
use app\modules\batchpdf\service\Pdf;
use yii\web\Controller;


class PdfController extends Controller
{

    /**
     * @return mixed
     */
    public function actionPdf()
    {
        $model = new PdfModel();
        $model->data1 = 11111;
        $model->data2 = 22222;
        $pdf_html = $this->renderPartial('sampleSheet', ['model' => $model]);

        $pdf = new Pdf([
            'mode' => Pdf::MODE_UTF8,
            'format' => Pdf::FORMAT_A4,
            'orientation' => Pdf::ORIENT_PORTRAIT,
            'destination' => Pdf::DEST_BROWSER,
            'content' => $pdf_html,
            'cssFile' => __DIR__ . '/../views/make/sampleSheet.css',
//             'cssFile' => '@vendor/kartik-v/yii2-mpdf/assets/kv-mpdf-bootstrap.min.css',
//            'cssInline' => $stylesheet,
            'options' => [],
            'methods' => [
//                'SetDefaultFont' =>['ipagp'],
//                'SetHeader'=>['Krajee Report Header'],
//                'SetFooter'=>['{PAGENO}'],
            ]
        ]);
        return $pdf->render();
    }

}