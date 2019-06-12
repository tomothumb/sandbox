<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class SampleCommand extends Command
{

    /**
     * The filesystem instance.
     *
     * @var \Illuminate\Filesystem\Filesystem
     */
    protected $files;

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type;


    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sample:sample';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new controller creator command instance.
     *
     * @param  \Illuminate\Filesystem\Filesystem  $files
     * @return void
     */
    public function __construct(Filesystem $files)
    {
        parent::__construct();

        $this->files = $files;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('start');
        $this->line('line');

        $models = [];
        $col = [
            'key' => null,
            'type' => null,
            'length' => null,
            'nullable' => null,
            'comment' => null,
        ];
        $columns = [];
        $model = $this->ask('Model名を入力してください');

        $this->info('Column`ID` は作成されます');
        $columns = $this->interactive();

        $validator = \Validator::make([
//            'first_name' => $firstName,
//            'last_name' => $lastName,
//            'email' => $email,
//            'password' => $password,
        ], [
//            'first_name' => ['required'],
//            'last_name' => ['required'],
//            'email' => ['required', 'email', 'unique:staff,email'],
//            'password' => ['required', 'min:8'],
        ]);

        if ($validator->fails()) {
            $this->info('Staff User not created. See error messages below:');
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }
            $columns = $this->interactive();

        }

        $this->line('line');
        foreach ($columns as $column){
            $this->line('line');
            foreach ($column as $key => $val){
                $this->info(sprintf("%s:%s",$key,$val));
            }

        }

        $makeModel_flg = $this->confirm('Make Model File?', 1);
        $makeMigration_flg = $this->confirm('Make Migration File?', 1);
        $makeFactory_flg = $this->confirm('Make Factory File?', 1);
        $makeSeeder_flg = $this->confirm('Make Seeder File?', 1);

        if($makeModel_flg){
            $this->makeModel($model, $column);
        }
        if ($makeMigration_flg){
            $this->makeMigration($model, $column);
        }
        if ($makeFactory_flg){
            $this->makeFactory($model, $column);
        }
        if ($makeSeeder_flg){
            $this->makeSeeder($model, $column);
        }

        $this->line('line');
        $this->info('end');
    }

    protected function interactive(){

        $continue = true;
        $index = 0;
        while ($continue){
            $column_key = $this->ask('Table Column');
            $column_type = $this->anticipate('Type [string|text|integer|date]', ['string', 'text', 'integer', 'date']);
            $column_length = null;
            if($column_type == 'string'){
                $column_length = $this->ask('Length', 191);
            }
            $column_unsigned = null;
            if($column_type == 'integer'){
                $column_unsigned = $this->confirm('unsigned', 1);
            }

            $column_nullable = $this->confirm('nullable', 1);
            $column_comment = $this->ask('Comment', false);

            $columns[$index] = [
                'key' => $column_key,
                'type' => $column_type,
                'length' => $column_length,
                'nullable' => $column_nullable,
                'unsigned' => $column_unsigned,
                'comment' => $column_comment,
            ];

            $index++;
            $continue = $this->confirm('カラムを追加しますか？');
        }

        return $columns;

    }

    protected function makeModel($model, $column){
        $this->call('command:called', ['--path' => 'call']);

        $path = '';
        $name = 'dummy';

        $this->files->put($path, $this->buildClass($name));
//        $this->info($this->type.' created successfully.');

    }

    protected function buildClass($name)
    {
        $stub = $this->files->get($this->getStub());

        return $this->replaceNamespace($stub, $name)->replaceClass($stub, $name);
    }


    protected function makeMigration($model, $column){

    }

    protected function makeFactory($model, $column){

    }

    protected function makeSeeder($model, $column){

    }

}
