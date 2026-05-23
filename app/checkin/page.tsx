"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRsvpByToken, checkInRsvp } from "@/lib/rsvp";
import { Rsvp } from "@/lib/types";
import QrScanner from "@/components/ui/QrScanner";
import GoldDivider from "@/components/ornament/GoldDivider";

type ScanState =
  | "idle"
  | "scanning"
  | "loading"
  | "success"
  | "already"
  | "invalid"
  | "error";

interface CheckinResult {
  rsvp: Rsvp;
  guestName: string;
  alreadyCheckedIn: boolean;
}

export default function CheckinPage() {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [result, setResult] = useState<CheckinResult | null>(null);
  const [scanActive, setScanActive] = useState(false);
  const processingRef = useRef(false); // ← guard level page

  const handleScan = useCallback(async (token: string) => {
    // Kalau sedang diproses, buang hasil scan berikutnya
    if (processingRef.current) return;
    processingRef.current = true;

    // Matikan scanner & set loading sebelum hit Supabase
    setScanActive(false);
    setScanState("loading");

    const rsvp = await getRsvpByToken(token);

    if (!rsvp) {
      setScanState("invalid");
      processingRef.current = false;
      return;
    }

    const guestName = rsvp.guests?.name ?? "Tamu";

    if (rsvp.checked_in) {
      setResult({ rsvp, guestName, alreadyCheckedIn: true });
      setScanState("already");
      processingRef.current = false;
      return;
    }

    const { success, error } = await checkInRsvp(rsvp.id, rsvp.guest_count);

    if (!success || error) {
      setScanState("error");
      processingRef.current = false;
      return;
    }

    setResult({ rsvp, guestName, alreadyCheckedIn: false });
    setScanState("success");
    processingRef.current = false;
  }, []);

  const handleLogout = async () => {
    await fetch("/api/checkin/auth", { method: "DELETE" });
    window.location.href = "/checkin/login";
  };

  const reset = () => {
    setResult(null);
    setScanState("idle");
    setScanActive(false);
    processingRef.current = false;
  };

  const startScan = () => {
    setScanState("scanning");
    setScanActive(true);
  };

  return (
    <main className="min-h-screen bg-[#1a0a0a] px-6 py-12">
      <div className="max-w-sm mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-between mb-1">
            <div /> {/* spacer */}
            <p className="text-gold-500/70 text-xs uppercase tracking-[0.4em] font-sans flex-1 text-center">
              Panitia Acara
            </p>
            <button
              onClick={handleLogout}
              className="text-cream-200/25 hover:text-cream-200/50 text-xs font-sans transition-colors"
              title="Keluar">
              Keluar
            </button>
          </div>
          <GoldDivider />
          <h1 className="font-serif text-3xl text-cream-100">Check-in Tamu</h1>
          <p className="text-cream-200/40 font-sans text-xs">
            Rizky &amp; Amira · 14 Juni 2025
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* ── IDLE ─────────────────────────── */}
          {scanState === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6">
              <div className="border border-gold-700/20 bg-maroon-950/30 rounded-sm p-8 space-y-4">
                <div className="text-gold-400/60 text-4xl">◈</div>
                <p className="text-cream-200/50 font-serif text-sm italic">
                  Siap untuk memindai QR Code tamu
                </p>
              </div>
              <button
                onClick={startScan}
                className="
                  w-full py-4 border border-gold-600/60
                  text-gold-400 font-serif text-sm tracking-widest
                  hover:bg-gold-600/10 transition-all duration-500
                  rounded-sm relative overflow-hidden group
                ">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                    <rect x="7" y="7" width="10" height="10" rx="1" />
                  </svg>
                  Mulai Scan QR
                </span>
              </button>
            </motion.div>
          )}

          {/* ── SCANNING ─────────────────────── */}
          {scanState === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-5">
              <QrScanner onScan={handleScan} active={scanActive} />
              <p className="text-center text-cream-200/40 font-sans text-xs">
                Arahkan kamera ke QR Code tamu
              </p>
              <button
                onClick={reset}
                className="w-full py-3 border border-maroon-800/60 text-cream-200/40 font-sans text-xs rounded-sm hover:border-gold-700/30 hover:text-cream-200/60 transition-colors">
                Batalkan
              </button>
            </motion.div>
          )}

          {/* ── LOADING ──────────────────────── */}
          {scanState === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center space-y-4">
              <div className="w-10 h-10 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto" />
              <p className="text-cream-200/50 font-serif text-sm italic">
                Memverifikasi data tamu...
              </p>
            </motion.div>
          )}

          {/* ── SUCCESS ──────────────────────── */}
          {scanState === "success" && result && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5">
              <div className="border border-gold-600/40 bg-maroon-950/60 rounded-sm p-6 text-center space-y-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="text-4xl text-gold-400">
                  ✦
                </motion.div>
                <p className="text-gold-400/70 text-xs uppercase tracking-widest font-sans">
                  Check-in Berhasil
                </p>
                <h2 className="font-serif text-2xl text-cream-100">
                  Selamat Datang,
                </h2>
                <p className="font-serif text-xl text-gold-300 italic">
                  {result.guestName} &amp; Keluarga
                </p>
                <GoldDivider />
                <p className="text-cream-200/50 font-sans text-xs">
                  Jumlah tamu:{" "}
                  <span className="text-gold-400 font-serif text-base">
                    {result.rsvp.guest_count} orang
                  </span>
                </p>
              </div>

              <div className="border border-gold-700/20 bg-[#1a0a0a]/50 rounded-sm divide-y divide-gold-700/10">
                {[
                  { label: "Nama", value: result.guestName },
                  {
                    label: "Jumlah Tamu",
                    value: `${result.rsvp.guest_count} orang`,
                  },
                  { label: "Status", value: "✓ Sudah Check-in" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center px-4 py-3">
                    <span className="text-cream-200/40 font-sans text-xs uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="text-cream-100 font-serif text-sm">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={reset}
                className="
                  w-full py-3.5 border border-gold-600/60
                  text-gold-400 font-serif text-sm tracking-widest
                  hover:bg-gold-600/10 transition-all duration-500 rounded-sm
                ">
                Scan Tamu Berikutnya
              </button>
            </motion.div>
          )}

          {/* ── ALREADY CHECK-IN ─────────────── */}
          {scanState === "already" && result && (
            <motion.div
              key="already"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5">
              <div className="border border-amber-800/40 bg-amber-950/20 rounded-sm p-6 text-center space-y-3">
                <div className="text-amber-500/80 text-3xl">⚠</div>
                <p className="text-amber-400/80 text-xs uppercase tracking-widest font-sans">
                  Sudah Check-in
                </p>
                <h2 className="font-serif text-xl text-cream-100">
                  {result.guestName} &amp; Keluarga
                </h2>
                <GoldDivider />
                <p className="text-cream-200/50 font-sans text-xs leading-relaxed">
                  Tamu ini sudah melakukan check-in sebelumnya dengan{" "}
                  {result.rsvp.checked_in_count} orang.
                </p>
              </div>
              <button
                onClick={reset}
                className="w-full py-3.5 border border-gold-700/40 text-gold-400 font-serif text-sm tracking-widest hover:bg-gold-600/10 transition-all rounded-sm">
                Kembali
              </button>
            </motion.div>
          )}

          {/* ── INVALID ──────────────────────── */}
          {scanState === "invalid" && (
            <motion.div
              key="invalid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5">
              <div className="border border-red-900/40 bg-red-950/20 rounded-sm p-6 text-center space-y-3">
                <div className="text-red-500/80 text-3xl">✕</div>
                <p className="text-red-400/80 text-xs uppercase tracking-widest font-sans">
                  QR Tidak Valid
                </p>
                <p className="text-cream-200/50 font-sans text-sm leading-relaxed">
                  Token tidak ditemukan dalam database. Pastikan QR Code berasal
                  dari undangan resmi.
                </p>
              </div>
              <button
                onClick={reset}
                className="w-full py-3.5 border border-gold-700/40 text-gold-400 font-serif text-sm tracking-widest hover:bg-gold-600/10 transition-all rounded-sm">
                Coba Lagi
              </button>
            </motion.div>
          )}

          {/* ── ERROR ────────────────────────── */}
          {scanState === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5">
              <div className="border border-red-900/40 bg-red-950/20 rounded-sm p-6 text-center space-y-3">
                <div className="text-red-500/80 text-3xl">!</div>
                <p className="text-red-400/80 text-xs uppercase tracking-widest font-sans">
                  Gagal Check-in
                </p>
                <p className="text-cream-200/50 font-sans text-sm">
                  Terjadi kesalahan saat menyimpan data. Coba lagi.
                </p>
              </div>
              <button
                onClick={reset}
                className="w-full py-3.5 border border-gold-700/40 text-gold-400 font-serif text-sm tracking-widest hover:bg-gold-600/10 transition-all rounded-sm">
                Kembali
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
