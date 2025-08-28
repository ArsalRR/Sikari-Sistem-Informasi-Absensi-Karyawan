<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

use App\Console\Commands\Absencomand;
use Illuminate\Foundation\Console\Kernel;
        
$schedule->command('app:absencomand')->dailyAt('00:01');



Artisan::command('inspire', function () {

    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
