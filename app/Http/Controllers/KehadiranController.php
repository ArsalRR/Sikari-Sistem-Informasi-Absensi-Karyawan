<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Karyawan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KehadiranController extends Controller
{
    public function index()
    {

        return Inertia::render('Kehadiran/index');
    }
    /**
     * Handle the incoming request.
     */
public function store(Request $request)
{
    $request->validate([
        'no_kerja' => 'required|string|exists:karyawan,no_kerja',
    ]);

    $karyawan = Karyawan::where('no_kerja', $request->no_kerja)->first();
    $today    = Carbon::today();
    $now      = Carbon::now();

    $absensi = Absensi::where('karyawan_id', $karyawan->id)
        ->whereDate('date', $today)
        ->first();

    if (!$absensi) {
        // Jika belum pernah absen sama sekali -> Check In
        $status = $now->gt(Carbon::parse($karyawan->jam_masuk)) ? 'telat' : 'hadir';

        Absensi::create([
            'karyawan_id'       => $karyawan->id,
            'date'              => $today,
            'check_in'          => $now, 
            'status_kedatangan' => $status,
        ]);

        return redirect()->back()->with('success', "{$karyawan->nama} berhasil Check In dengan status {$status}");
    } elseif ($absensi && !$absensi->check_out) {
        $absensi->update([
            'check_out' => $now->gt(Carbon::parse($karyawan->jam_pulang)) 
                            ? Carbon::parse($karyawan->jam_pulang) 
                            : $now,
        ]);

        return redirect()->back()->with('success', "{$karyawan->nama} berhasil Check Out");
    } else {
        return redirect()->back()->with('error', "Anda sudah absen hari ini");
    }
}


}
