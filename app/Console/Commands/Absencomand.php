<?php

namespace App\Console\Commands;

use App\Models\Absensi;
use App\Models\Karyawan;
use Carbon\Carbon;
use Illuminate\Console\Command;

class Absencomand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:absencomand';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
         $today = Carbon::today()->toDateString();

        $karyawans = Karyawan::all();

        foreach ($karyawans as $karyawan) {
            $cek = Absensi::where('karyawan_id', $karyawan->id)
                ->whereDate('date', $today)
                ->exists();

            if (!$cek) {
                Absensi::create([
                    'karyawan_id' => $karyawan->id,
                    'date' => $today,
                    'status_kedatangan' => 'Alpa',
                ]);
            }
        }

        $this->info("Absensi alpa berhasil ditandai untuk karyawan yang tidak hadir.");
    }
    }

