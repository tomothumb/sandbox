<?php

namespace Tomothumb\LaravelpkgHelloworld;

use Illuminate\Support\ServiceProvider;
use Tomothumb\LaravelpkgHelloworld\Console\HelloworldCommand;
use Tomothumb\LaravelpkgHelloworld\Service\HelloworldService;

class HelloworldServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        // Distribute Config File
        $this->publishes([
            __DIR__ . '/Resource/Config/helloworld.php' => config_path('helloworld.php')
        ]);

        // Route
        $this->loadRoutesFrom(__DIR__.'/routes.php');



    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {

        // Service
        $this->app->singleton('Tomothumb\LaravelpkgHelloworld\Contracts\HelloworldContracts', function($app){
            return new HelloworldService("Hello Universe.");
        });

        // Command
        $this->app->singleton('Tomothumb\LaravelpkgHelloworld\Command\HelloworldCommand', function ($app) {
            return new HelloworldCommand();
        });
        if ($this->app->runningInConsole()) {
            $this->commands('Tomothumb\LaravelpkgHelloworld\Command\HelloworldCommand');
        }

    }
}
