<?php

namespace app\modules\sample\service;

use mPDF;

class Pdf extends \kartik\mpdf\Pdf
{

    /**
     * @inheritdoc
     */
    public function init()
    {
        if (!defined('_MPDF_TTFONTPATH')) {
            define('_MPDF_TTFONTPATH', realpath(__DIR__.'/../assets/ttfonts/').'/');
        }
        parent::init();
    }


    /**
     * @inheritDoc
     */
    public function setApi()
    {
        $this->_mpdf = new mPDF(
            $this->mode,
            $this->format,
            $this->defaultFontSize,
            $this->defaultFont,
            0,
            0,
            0,
            0,
            0,
            0,
            $this->orientation
        );
        $this->addCustomFontsToMpdf();
        $this->_mpdf->SetDefaultFont('ipagp');
    }

    /**
     * 和文フォントを使えるように
     * @param $mpdf
     */
    private function addCustomFontsToMpdf() {
        $fontdata = [
            'ipagp' => [
                'R' => 'ipagp.ttf',
                'B' => 'ipagp.ttf',
                'I' => 'ipagp.ttf',
                'BI' => 'ipagp.ttf',
            ],
        ];
        foreach ($fontdata as $f => $fs) {
            // add to fontdata array
            $this->_mpdf->fontdata[$f] = $fs;

            // add to available fonts array
            foreach (['R', 'B', 'I', 'BI'] as $style) {
                if (isset($fs[$style]) && $fs[$style]) {
                    // warning: no suffix for regular style! hours wasted: 2
                    $this->_mpdf->available_unifonts[] = $f . trim($style, 'R');
                }
            }
        }
        $this->_mpdf->default_available_fonts = $this->_mpdf->available_unifonts;
    }
}