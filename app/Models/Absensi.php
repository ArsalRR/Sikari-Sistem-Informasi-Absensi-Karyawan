<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    protected $table = 'absensi';
    protected $fillable = [
        'karyawan_id',
        'date',
        'check_in',
        'check_out',
        'status_kedatangan',
    ];
      protected $casts = [
        'date' => 'date',
        'check_in' => 'datetime',
        'check_out' => 'datetime',
    ];
    public function karyawan()
    {
        return $this->belongsTo(Karyawan::class);
    }
}
