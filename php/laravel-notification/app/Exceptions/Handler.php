<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use League\Flysystem\FileNotFoundException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        $this->_notifyThroughSms($e);
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        return parent::render($request, $exception);
    }

    private function _notifyThroughSms($e)
    {
        foreach ($this->_notifycationRecipients() as $recipient()){
            $this->_sendSms(
                $recipient->phone_number,
                '[This is a test] It appears the server' .
                ' is having issues. Exception: ' . $e->getMessage() .
                ' Go to http://newrelic.com for more details.'
            );
        }
    }

    private function _notifycationRecipients()
    {
        $adminsFile = base_path() . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'administrations.json';
        try{
            $adminsFileContents = \File::get($adminsFile);
            return json_decode($adminsFileContents);
        } catch (FileNotFoundException $e){
            \Log::error('could not find ' . $adminsFile . ' to notify admins through SMS');
            return [];
        }

    }

    private function _sendSms($phone_number, string $string)
    {
        $accountSid = env('TWILIO_ACCOUNT_SID');
        $authToken = env('TWILIO_AUTH_TOKEN');
        $twilioNumber = env( 'TWILIO_NUMBER');

        $client = new Client($accountSid, $authToken);

        try {

        } catch (TwilioException $e){
            \Log::error(
                "Could not send SMS notification." .
                ' Twilio replied with: ' . $e
            );
        }
    }
}
