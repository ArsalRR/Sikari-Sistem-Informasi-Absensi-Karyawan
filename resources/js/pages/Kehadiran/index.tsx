import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';
import Swal from 'sweetalert2';
import { useForm } from '@inertiajs/react';
import { Clock, CheckCircle, User, Calendar } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kehadiran',
    href: '/kehadiran',
  },
];

export default function Kehadiran() {
  const { data, setData, post, processing } = useForm({
    no_kerja: '',
  });

  const currentTime = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();

    post(route("kehadiran.store"), {
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          title: "Berhasil!",
          text: "Absensi berhasil disimpan",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        setData("no_kerja", "");
      },
      onError: () => {
        Swal.fire({
          title: "Gagal!",
          text: "Absensi gagal disimpan",
          icon: "error",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sistem Absensi Si Kari
              </h1>
            </div>
            <Badge variant="outline" className="text-sm">
              {currentTime}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-center space-x-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Hari ini</p>
                  <p className="font-medium text-gray-900 dark:text-white">{currentDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit">
                <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Absensi Kehadiran
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Masukkan nomor kerja untuk melakukan absensi
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="no_kerja" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nomor Kerja
                  </Label>
                  <Input
                    id="no_kerja"
                    placeholder="Contoh: EMP001"
                    value={data.no_kerja}
                    onChange={(e) => setData("no_kerja", e.target.value)}
                    required
                    autoComplete='off'
                    disabled={processing}
                    className="h-12 text-center text-lg font-mono tracking-wider border-2 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                  disabled={processing || !data.no_kerja.trim()}
                >
                  {processing ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Memproses...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Absen Sekarang</span>
                    </div>
                  )}
                </Button>
              </form>
              <div className="flex items-center justify-center space-x-4 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600 dark:text-gray-400">Sistem Online</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-400">Siap Absensi</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}