<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('karyawan', function (Blueprint $table) {
            $table->id();
               $table->string('no_kerja')->unique(); 
    $table->string('nama_lengkap');
    $table->string('no_hp');
    $table->string('alamat');
    $table->string('jabatan');
    $table->string('departemen');
    $table->integer('gaji');
  $table->time('jam_masuk')->default('08:00');
$table->time('jam_pulang')->default('17:00');
    $table->string('status')->default('aktif');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('karyawan');
    }
};
