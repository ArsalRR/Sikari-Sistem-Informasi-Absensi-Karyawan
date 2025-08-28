<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function index (){
       $hariini = Carbon::today();

 
    $laporan = Absensi::with('karyawan')
        ->whereDate('date', $hariini)
        ->get()
        ->map(function ($item) {
            return [
                'id'         => $item->id,
                'nama_lengkap'       => $item->karyawan->nama_lengkap ?? '-',
                'no_kerja'   => $item->karyawan->no_kerja ?? '-',
                'jabatan'    => $item->karyawan->jabatan ?? '-',
                'status'     => $item->status_kedatangan,
                'check_in'   => $item->check_in ? $item->check_in->format('H:i:s') : '-',
                'check_out'  => $item->check_out ? $item->check_out->format('H:i:s') : '-',
                'tanggal'    => $item->date->format('d-m-Y'),
            ];
        });

    return Inertia::render('Admin/Laporan/laporanharian', [
        'laporan' => $laporan,
        'hariini' => $hariini->format('d-m-Y'),
        'total'   => $laporan->count(),
    ]);
}
}
