import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, User, Users, Phone, Briefcase, DollarSign, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import Swal from 'sweetalert2'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Data Karyawan',
    href: '/karyawan',
  },
];

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'aktif':
      return 'default';
    case 'non-aktif':
    case 'nonaktif':
      return 'destructive';
    case 'cuti':
      return 'secondary';
    default:
      return 'outline';
  }
};

export default function Karyawan() {
  const { karyawan } = usePage<{ karyawan: Karyawan[] }>().props;
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // State untuk search dan pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const deleteKaryawan = async (id: number) => {
    try {
      setDeletingId(id);
      await router.delete(route('karyawan.destroy', id));
      window.location.reload();
    } catch (error) {
    } finally {
      Swal.fire({
        title: "Data Berhasil Dihapus!",
        text: "Karyawan Berhasil Dihapus",
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      setDeletingId(null);
    }
  };
  const filteredData = useMemo(() => {
    return karyawan.filter((item) =>
      item.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
      item.no_hp.toLowerCase().includes(search.toLowerCase()) ||
      item.jabatan.toLowerCase().includes(search.toLowerCase()) ||
      item.departemen.toLowerCase().includes(search.toLowerCase())
    );
  }, [karyawan, search]);

  // Hitung pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Data Karyawan - Sikari" />

      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Data Karyawan</h1>
            <p className="text-muted-foreground">
              Kelola data karyawan perusahaan Anda
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari karyawan..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8"
              />
            </div>
            <Button asChild size="lg" className="w-fit">
              <Link href="/karyawan/create">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Karyawan
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Daftar Karyawan
            </CardTitle>
            <CardDescription>
              Daftar lengkap karyawan dengan informasi detail
            </CardDescription>
          </CardHeader>
          <CardContent>
            {paginatedData.length > 0 ? (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">No</TableHead>
                        <TableHead>No Kerja</TableHead>
                        <TableHead className="hidden md:table-cell">Nama Lengkap</TableHead>
                        <TableHead className="hidden sm:table-cell">No HP</TableHead>
                        <TableHead>Jabatan</TableHead>
                        <TableHead className="hidden lg:table-cell">Departemen</TableHead>
                        <TableHead className="text-right">Gaji</TableHead>
                        <TableHead>Alamat</TableHead>
                        <TableHead>Jam Masuk</TableHead>
                        <TableHead>Jam Pulang</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.map((item, index) => (
                        <TableRow key={item.id} className="hover:bg-muted/50">
                          <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                          <TableCell>{item.no_kerja}</TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
                            {item.nama_lengkap}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{item.no_hp}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.jabatan}</Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{item.departemen}</TableCell>
                          <TableCell className="text-right">{formatRupiah(item.gaji)}</TableCell>
                          <TableCell>{item.alamat}</TableCell>
                              <TableCell>{item.jam_masuk}</TableCell>
                              <TableCell>{item.jam_pulang}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(item.status)}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right flex gap-2 justify-end">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={route('karyawan.edit', item.id)}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive"
                                  disabled={deletingId === item.id}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Apakah Anda yakin ingin menghapus karyawan <strong>{item.nama_lengkap}</strong>?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteKaryawan(item.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Hapus
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Halaman {currentPage} dari {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      Sebelumnya
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Berikutnya
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Belum ada data karyawan</h3>
                <p className="mt-2 text-muted-foreground">
                  Mulai dengan menambahkan karyawan pertama Anda.
                </p>
                <Button asChild className="mt-4">
                  <Link href="/karyawan/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Karyawan
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
