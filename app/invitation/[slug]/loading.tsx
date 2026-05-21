export default function Loading() {
  return (
    <main className="min-h-screen bg-[#1a0a0a] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto" />
        <p className="text-gold-400/70 text-sm tracking-widest font-sans">
          Memuat undangan...
        </p>
      </div>
    </main>
  );
}
