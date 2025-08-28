<?php

use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\KehadiranController;
use App\Http\Controllers\LaporanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Kehadiran/index');
})->name('home');
Route::get('kehadiran', [KehadiranController::class, 'index'])->name('kehadiran');
Route::post('kehadiran', [KehadiranController::class, 'store'])->name('kehadiran.store');
Route::get('laporanharian', [LaporanController::class, 'index'])->name('laporan.harian');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('karyawan', KaryawanController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
