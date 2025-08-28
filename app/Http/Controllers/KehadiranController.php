<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Karyawan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

    $jamPulang = Carbon::today()->setTimeFromTimeString($karyawan->jam_pulang);

    $absensi = Absensi::where('karyawan_id', $karyawan->id)
        ->whereDate('date', $today)
        ->first();
    if (!$absensi) {
        $jamMasuk = Carbon::today()->setTimeFromTimeString($karyawan->jam_masuk);
        $status = $now->gt($jamMasuk) ? 'telat' : 'hadir';

        Absensi::create([
            'karyawan_id'       => $karyawan->id,
            'date'              => $today,
            'check_in'          => $now,
            'status_kedatangan' => $status,
        ]);

        return redirect()->back()->with('success', "{$karyawan->nama} berhasil Check In dengan status {$status} pada {$now->format('H:i')}");
    } 
    elseif ($absensi && !$absensi->check_out) {
        if ($now->lt($jamPulang)) {
            $waktuTersisa = $jamPulang->diffInMinutes($now);
            $jam = floor($waktuTersisa / 60);
            $menit = $waktuTersisa % 60;
            
            $waktuText = '';
            if ($jam > 0) {
                $waktuText .= "{$jam} jam";
                if ($menit > 0) {
                    $waktuText .= " {$menit} menit";
                }
            } else {
                $waktuText = "{$menit} menit";
            }
            
            return redirect()->back()->with('warning', 
                "⚠️ {$karyawan->nama} sudah absen masuk pada {$absensi->check_in->format('H:i')}. " .
                "Check Out hanya bisa dilakukan setelah jam {$karyawan->jam_pulang}. " .
                "Waktu tersisa: {$waktuText}"
            );
        }

        $absensi->update([
            'check_out' => $now,
        ]);

        return redirect()->back()->with('success', "{$karyawan->nama} berhasil Check Out pada {$now->format('H:i')}");
    }
    else {
        return redirect()->back()->with('warning', 
            "⚠️ {$karyawan->nama} sudah melakukan absensi lengkap hari ini. " .
            "Check In: {$absensi->check_in->format('H:i')} | " .
            "Check Out: {$absensi->check_out->format('H:i')}"
        );
    }
}


public function markAbsentEmployees()
{
    $today = Carbon::today();
    $jamMasukBatas = Carbon::now()->setTime(23, 59, 59); 
    $karyawanIds = Karyawan::where('status', 'aktif')->pluck('id');
    $sudahAbsenIds = Absensi::whereDate('date', $today)
        ->whereIn('karyawan_id', $karyawanIds)
        ->pluck('karyawan_id');
    $belumAbsenIds = $karyawanIds->diff($sudahAbsenIds);
    foreach ($belumAbsenIds as $karyawanId) {
        $karyawan = Karyawan::find($karyawanId);
        
        Absensi::create([
            'karyawan_id'       => $karyawanId,
            'date'              => $today,
            'check_in'          => null,
            'check_out'         => null,
            'status_kedatangan' => 'alpa',
        ]);
    Log::info("Karyawan {$karyawan->nama} ({$karyawan->no_kerja}) ditandai alpa pada {$today->format('Y-m-d')}");
    }
    
    return count($belumAbsenIds);
}


}
