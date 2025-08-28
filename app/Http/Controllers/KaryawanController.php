<?php

namespace App\Http\Controllers;

use App\Models\Karyawan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KaryawanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $karyawan = Karyawan::all();
        return Inertia::render('Karyawan/index', [
            'karyawan' => $karyawan
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Karyawan/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'no_kerja' => 'required',
            'jam_masuk' => 'required',
            'jam_pulang' => 'required',
            'nama_lengkap' => 'required',
            'no_hp' => 'required',
            'alamat' => 'required',
            'jabatan' => 'required',
            'departemen' => 'required',
            'gaji' => 'required',
            'status' => 'required',

        ],[
            'no_kerja.required' => 'No Kerja Wajib Diisi',
            'nama_lengkap.required' => 'Nama Lengkap Wajib Diisi',
            'no_hp.required' => 'No HP Wajib Diisi',
            'alamat.required' => 'Alamat Wajib Diisi',
            'jabatan.required' => 'Jabatan Wajib Diisi',
            'departemen.required' => 'Departemen Wajib Diisi',
            'gaji.required' => 'Gaji Wajib Diisi',
            'status.required' => 'Status Wajib Diisi',
        ]);
        $gaji = preg_replace('/[^0-9]/', '', $request->gaji);
        $jam_masuk = date('H:i:s', strtotime($request->jam_masuk));
        $jam_pulang = date('H:i:s', strtotime($request->jam_pulang));
        Karyawan::create([
            'no_kerja' => $request->no_kerja,
            'nama_lengkap' => $request->nama_lengkap,
            'no_hp' => $request->no_hp,
            'alamat' => $request->alamat,
            'jabatan' => $request->jabatan,
            'departemen' => $request->departemen,
            'gaji' => $gaji,
            'status' => $request->status,
            'jam_masuk' => $jam_masuk,
            'jam_pulang' => $jam_pulang,
        ]);
        return redirect()->route('karyawan.index')->with('success', 'Karyawan created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Karyawan $karyawan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Karyawan $karyawan)
    {
        return Inertia::render('Karyawan/edit', [
            'karyawan' => $karyawan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Karyawan $karyawan)
    {
        $validate = $request->validate([
            'no_kerja' => 'required',
            'nama_lengkap' => 'required',
            'no_hp' => 'required',
            'alamat' => 'required',
            'jabatan' => 'required',
            'departemen' => 'required',
            'gaji' => 'required',
            'status' => 'required',
            'jam_masuk' => 'required',
            'jam_pulang' => 'required',
        ],[
            'no_kerja.required' => 'No Kerja Wajib Diisi',
            'nama_lengkap.required' => 'Nama Lengkap Wajib Diisi',
            'no_hp.required' => 'No HP Wajib Diisi',
            'alamat.required' => 'Alamat Wajib Diisi',
            'jabatan.required' => 'Jabatan Wajib Diisi',
            'departemen.required' => 'Departemen Wajib Diisi',
            'gaji.required' => 'Gaji Wajib Diisi',
            'status.required' => 'Status Wajib Diisi',
        ]);
        $karyawan->update($validate);
        return redirect()->route('karyawan.index')->with('success', 'Karyawan updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Karyawan $karyawan)
    {
        $karyawan->delete();
        return redirect()->route('karyawan.index')->with('success', 'Karyawan deleted successfully');
    }
}
