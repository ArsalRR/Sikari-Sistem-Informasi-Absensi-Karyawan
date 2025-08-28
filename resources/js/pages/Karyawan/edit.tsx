import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  User,
  Phone,
  MapPin,
  Briefcase,
  Building,
  DollarSign,
  Save,
  X,
  ArrowLeft,
  RefreshCw,
  CheckCircle
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { type BreadcrumbItem } from '@/types';

interface Karyawan {
  id: number;
  no_kerja: string;
  nama: string;
  nama_lengkap: string;
  no_hp: string;
  alamat: string;
  jabatan: string;
  departemen: string;
  gaji: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

interface EditProps {
  karyawan: Karyawan;
}

export default function Edit() {
  const { karyawan } = usePage<{ props: EditProps }>().props;

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Data Karyawan', href: '/karyawan' },
    { title: 'Edit Karyawan', href: `/karyawan/${(karyawan as Karyawan).id}/edit` },
  ];

  const { data, setData, put, processing, errors, wasSuccessful } = useForm<{
    no_kerja: string;
    nama: string;
    nama_lengkap: string;
    no_hp: string;
    alamat: string;
    jabatan: string;
    departemen: string;
    gaji: string;
    status: string;
  }>({
    no_kerja: karyawan.no_kerja ?? "",
    nama: karyawan.nama ?? "",
    nama_lengkap: (karyawan as Karyawan).nama_lengkap ?? "",
    no_hp: karyawan.no_hp ?? "",
    alamat: karyawan.alamat ?? "",
    jabatan: karyawan.jabatan ?? "",
    departemen: karyawan.departemen ?? "",
    gaji: karyawan.gaji?.toString() ?? "",
    status: karyawan.status ?? "aktif",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Convert gaji to number when submitting
    const formData = {
      ...data,
      gaji: parseInt(data.gaji.replace(/[^\d]/g, '')) || 0,
    };
    
    put(route("karyawan.update", karyawan.id), formData);
  }

  const formatGaji = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    return numbers ? parseInt(numbers).toLocaleString('id-ID') : '';
  };

  const generateNoKerja = () => {
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    setData("no_kerja", `EMP-${randomNum}`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Karyawan - ${karyawan.nama} - Sikari`} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/karyawan" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Kembali
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <User className="h-7 w-7" />
              Edit Data Karyawan
            </h1>
            <p className="text-muted-foreground">
              Perbarui informasi karyawan: <strong>{karyawan.nama}</strong>
            </p>
          </div>
          <Badge variant="outline">ID: {karyawan.id}</Badge>
        </div>

        {/* Success Alert */}
        {wasSuccessful && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Data karyawan berhasil diperbarui!
            </AlertDescription>
          </Alert>
        )}

        {/* Main Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informasi Karyawan
            </CardTitle>
            <CardDescription>
              Lengkapi semua informasi untuk memperbarui data karyawan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-6">
              {/* Identitas Karyawan Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Identitas Karyawan</h3>
                </div>
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* No Kerja */}
                  <div className="space-y-2">
                    <Label htmlFor="no_kerja" className="text-sm font-medium">
                      No Kerja <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="no_kerja"
                        value={data.no_kerja}
                        onChange={e => setData("no_kerja", e.target.value)}
                        placeholder="EMP-000001"
                        className={errors.no_kerja ? "border-red-500" : ""}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={generateNoKerja}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    {errors.no_kerja && (
                      <p className="flex items-center gap-1 text-sm text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {errors.no_kerja}
                      </p>
                    )}
                  </div>

                  {/* Nama */}
                  <div className="space-y-2">
                    <Label htmlFor="nama" className="text-sm font-medium">
                      Nama <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nama"
                      value={data.nama}
                      onChange={e => setData("nama", e.target.value)}
                      placeholder="John"
                      className={errors.nama ? "border-red-500" : ""}
                    />
                    {errors.nama && (
                      <p className="flex items-center gap-1 text-sm text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {errors.nama}
                      </p>
                    )}
                  </div>

                  {/* Nama Lengkap */}
                  <div className="space-y-2">
                    <Label htmlFor="nama_lengkap" className="text-sm font-medium">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nama_lengkap"
                      value={data.nama_lengkap}
                      onChange={e => setData("nama_lengkap", e.target.value)}
                      placeholder="John Doe Smith"
                      className={errors.nama_lengkap ? "border-red-500" : ""}
                    />
                    {errors.nama_lengkap && (
                      <p className="flex items-center gap-1 text-sm text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {errors.nama_lengkap}
                      </p>
                    )}
                  </div>

                  {/* No HP */}
                  <div className="space-y-2">
                    <Label htmlFor="no_hp" className="text-sm font-medium">
                      No HP <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="no_hp"
                        value={data.no_hp}
                        onChange={e => setData("no_hp", e.target.value)}
                        placeholder="08123456789"
                        className={`pl-10 ${errors.no_hp ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.no_hp && (
                      <p className="flex items-center gap-1 text-sm text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {errors.no_hp}
                      </p>
                    )}
                  </div>
                </div>

                {/* Alamat */}
                <div className="space-y-2">
                  <Label htmlFor="alamat" className="text-sm font-medium">
                    Alamat
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="alamat"
                      value={data.alamat}
                      onChange={e => setData("alamat", e.target.value)}
                      placeholder="Alamat lengkap karyawan"
                      className={`pl-10 min-h-[80px] ${errors.alamat ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.alamat && (
                    <p className="flex items-center gap-1 text-sm text-red-600">
                      <AlertCircle className="h-3 w-3" />
                      {errors.alamat}
                    </p>
                  )}
                </div>
              </div>

              {/* Informasi Pekerjaan Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Informasi Pekerjaan</h3>
                </div>
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Jabatan */}
                  <div className="space-y-2">
                    <Label htmlFor="jabatan" className="text-sm font-medium">
                      Jabatan <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="jabatan"
                        value={data.jabatan}
                        onChange={e => setData("jabatan", e.target.value)}
                        placeholder="Software Engineer"
                        className={`pl-10 ${errors.jabatan ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.jabatan && (
                      <p className="flex items-center gap-1 text-sm text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {errors.jabatan}
                      </p>
                    )}
                  </div>

                  {/* Departemen */}
                  <div className="space-y-2">
                    <Label htmlFor="departemen" className="text-sm font-medium">
                      Departemen <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={data.departemen} 
                      onValueChange={value => setData("departemen", value)}
                    >
                      <SelectTrigger className={errors.departemen ? "border-red-500" : ""}>
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Pilih departemen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Akuntan">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Akuntan
                          </div>
                        </SelectItem>
                        <SelectItem value="Staf">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Staff
                          </div>
                        </SelectItem>
                        <SelectItem value="IT Support">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            IT Support
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.departemen && (
                      <p className="flex items-center gap-1 text-sm text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {errors.departemen}
                      </p>
                    )}
                  </div>

                  {/* Gaji */}
                  <div className="space-y-2">
                    <Label htmlFor="gaji" className="text-sm font-medium">
                      Gaji <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="gaji"
                        value={data.gaji}
                        onChange={e => setData("gaji", formatGaji(e.target.value))}
                        placeholder="5,000,000"
                        className={`pl-10 ${errors.gaji ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.gaji && (
                      <p className="flex items-center gap-1 text-sm text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {errors.gaji}
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium">
                      Status <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={data.status} 
                      onValueChange={value => setData("status", value)}
                    >
                      <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aktif">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Aktif
                          </div>
                        </SelectItem>
                        <SelectItem value="nonaktif">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            Non Aktif
                          </div>
                        </SelectItem>
                        <SelectItem value="cuti">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            Cuti
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.status && (
                      <p className="flex items-center gap-1 text-sm text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {errors.status}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <Separator />
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  disabled={processing}
                >
                  <Link href="/karyawan" className="flex items-center gap-2">
                    <X className="h-4 w-4" />
                    Batal
                  </Link>
                </Button>
                <Button 
                  type="submit" 
                  disabled={processing}
                  className="flex items-center gap-2"
                >
                  {processing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Perbarui Data
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}