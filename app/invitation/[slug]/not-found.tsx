export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#1a0a0a] flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <p className="text-red-400/80 text-sm tracking-widest uppercase">
          Undangan tidak ditemukan
        </p>
        <h1 className="text-cream-100 font-serif text-3xl">
          Halaman Tidak Tersedia
        </h1>
        <p className="text-cream-200/50 text-sm mt-3">
          Link undangan yang Anda akses tidak valid.
          <br />
          Silakan hubungi pengantin untuk mendapatkan link yang benar.
        </p>
      </div>
    </main>
  );
}
