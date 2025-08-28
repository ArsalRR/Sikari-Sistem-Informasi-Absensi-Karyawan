import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Data Laporan Harian',
    href: '/laporanharian',
  },
];

interface LaporanItem {
  id: number;
  nama_lengkap: string;
  no_kerja: string;
  status: string;
  check_in: string | null;
  check_out: string | null;
  tanggal: string;
  jabatan?: string; 
}

export default function LaporanHarian() {
  const { laporan, hariini, total } = usePage().props as unknown as {
    laporan: LaporanItem[];
    hariini: string;
    total: number;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Laporan Harian" />
      <div className="container mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-2">Laporan Harian</h2>
          <p className="text-gray-600">Tanggal: {hariini} | Total: {total}</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Laporan Absensi Harian Karyawan</CardTitle>
          <CardDescription>Daftar absensi hari ini</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No Kerja</TableHead>
                <TableHead>Nama Karyawan</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Jam Masuk</TableHead>
                <TableHead>Jam Pulang</TableHead>
                <TableHead>Status Kedatangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laporan.length > 0 ? (
                laporan.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.no_kerja}</TableCell>
                    <TableCell>{item.nama_lengkap}</TableCell>
                    <TableCell>{item.jabatan ?? '-'}</TableCell>
                    <TableCell>{item.check_in ?? '-'}</TableCell>
                    <TableCell>{item.check_out ?? '-'}</TableCell>
                    <TableCell>
                      <span
                        className={
                          item.status === 'hadir'
                            ? 'text-green-600 font-semibold'
                            : item.status === 'telat'
                            ? 'text-yellow-600 font-semibold'
                            : item.status === 'alpa'
                            ? 'text-red-600 font-semibold'
                            : 'text-gray-600'
                        }
                      >
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    Tidak ada data absensi hari ini
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
