<?php

namespace app\modules\sample\controllers;

use app\modules\sample\models\PdfModel;
use app\modules\sample\service\Pdf;
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
        $pdf->destination = Pdf::DEST_BROWSER;
        //ファイルに保存
//        $pdf->destination = Pdf::DEST_FILE;
        $filename = realpath(__DIR__."/../storage/" ). '/sample.pdf';
        $pdf->filename = $filename;

        return $pdf->render();
    }

}