<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    protected $table = 'karyawan';
    protected $fillable = [
        'no_kerja',
        'nama',
        'nama_lengkap',
        'no_hp',
        'alamat',
        'jabatan',
        'departemen',
        'gaji',
        'status',
    ];

}
