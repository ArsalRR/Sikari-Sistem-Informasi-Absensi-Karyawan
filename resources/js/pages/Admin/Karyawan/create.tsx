import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Swal from 'sweetalert2'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        no_kerja: "",
        jam_masuk: "",
        jam_pulang: "",
        nama_lengkap: "",
        no_hp: "",
        alamat: "",
        jabatan: "",
        departemen: "",
        gaji: "",
        status: "aktif",
    });
     function submit(e: React.FormEvent) {
  e.preventDefault();
  post(route("karyawan.store"), {
    preserveScroll: true, 
    onSuccess: onSuccessalert,
    onError: onErroralert,
  });
  function onSuccessalert() {
 Swal.fire({
  title: "Data Berhasil Disimpan!",
  text: "Karyawan Berhasil Ditambahkan",
  icon: "success",
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
  }
  function onErroralert() {
   Swal.fire({
  title: "Data Gagal Disimpan!",
  text: "Karyawan Gagal Ditambahkan",
  icon: "error",
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
  }
}
    return (
        <AppLayout>
            <Head title="Create Karyawan" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                    <h1 className="text-2xl font-bold">Tambah Karyawan</h1>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Tambah Karyawan Baru</CardTitle>
                        <CardDescription>Add a new employee to the system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="no_kerja">No Kerja</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="no_kerja"
                                        value={data.no_kerja}
                                        onChange={e => setData("no_kerja", e.target.value)}
                                        autoComplete='off'
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
                                            setData("no_kerja", `EMP-${randomNum}`);
                                        }}
                                    >
                                        Generate
                                    </Button>
                                    
                                </div>
                                {errors.no_kerja && <p className="text-red-500 text-sm">{errors.no_kerja}</p>}
                            </div>
                           
                            <div className="space-y-2">
                                <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
                                <Input
                                    id="nama_lengkap"
                                    value={data.nama_lengkap}
                                    onChange={e => setData("nama_lengkap", e.target.value)}
                                />
                                {errors.nama_lengkap && <p className="text-red-500 text-sm">{errors.nama_lengkap}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="no_hp">No HP</Label>
                                <Input
                                    id="no_hp"
                                    value={data.no_hp}
                                    onChange={e => setData("no_hp", e.target.value)}
                                />
                                {errors.no_hp && <p className="text-red-500 text-sm">{errors.no_hp}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="alamat">Alamat</Label>
                                <Input
                                    id="alamat"
                                    value={data.alamat}
                                    onChange={e => setData("alamat", e.target.value)}
                                />
                                {errors.alamat && <p className="text-red-500 text-sm">{errors.alamat}</p>}
                            </div>
                          <div className="space-y-2">
                                <Label htmlFor="status">Jabatan</Label>
                                <select
                                    id="jabatan"
                                    value={data.jabatan}
                                    onChange={e => setData("jabatan", e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="CEO">CEO</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Staff">Staff</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                              <div className="space-y-2">
                                <Label htmlFor="departemen">Departemen</Label>
                                <select
                                    id="departemen"
                                    value={data.status}
                                    onChange={e => setData("departemen", e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Silahkan Pilih Departemen</option>
                                    <option value="Akuntan">Akuntan</option>
                                    <option value="Staf">Staff</option>
                                    <option value="IT Support">IT Support</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gaji">Gaji</Label>
                                <Input
                                    id="gaji"
                                    value={data.gaji}
                                    onChange={e => {
                                        const value = e.target.value.replace(/[^\d]/g, '');
                                        const formattedValue = value ? parseInt(value).toLocaleString() : '';
                                        setData("gaji", formattedValue);
                                    }}
                                />
                                {errors.gaji && <p className="text-red-500 text-sm">{errors.gaji}</p>}
                            </div>
                              <div className="space-y-2">
                                <Label htmlFor="jam_masuk">Jam Masuk</Label>
                                <Input
                                    id="jam_masuk"
                                    value={data.jam_masuk}
                                    onChange={e => setData("jam_masuk", e.target.value)}
                                    type='time'
                                />
                                {errors.jam_masuk && <p className="text-red-500 text-sm">{errors.jam_masuk}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="jam_pulang">Jam Pulang</Label>
                                <Input
                                    id="jam_pulang"
                                    value={data.jam_pulang}
                                    onChange={e => setData("jam_pulang", e.target.value)}
                                    type='time'
                                />
                                {errors.jam_pulang && <p className="text-red-500 text-sm">{errors.jam_pulang}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={e => setData("status", e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="aktif">Aktif</option>
                                    <option value="nonaktif">Non Aktif</option>
                                    <option value="cuti">Cuti</option>
                                </select>
                            </div>
                            <div className="col-span-2 mt-4 flex items-center gap-4">
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-primary hover:bg-primary/90"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        "Save"
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    asChild
                                >
                                    <Link href="/karyawan">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
