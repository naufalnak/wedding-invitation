"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import GoldDivider from "@/components/ornament/GoldDivider";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/checkin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Masukkan password terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Terjadi kesalahan.");
        setPassword("");
        inputRef.current?.focus();
        setLoading(false);
        return;
      }

      router.replace(from);
    } catch {
      setError("Gagal terhubung ke server. Coba lagi.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#1a0a0a] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-3">
          <p className="text-gold-500/70 text-xs uppercase tracking-[0.4em] font-sans">
            Akses Panitia
          </p>
          <GoldDivider />
          <h1 className="font-serif text-3xl text-cream-100">Check-in Tamu</h1>
          <p className="text-cream-200/40 font-sans text-xs">
            Rizky &amp; Amira · 14 Juni 2025
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gold-400/70 text-xs uppercase tracking-widest font-sans mb-2">
              Password Panitia
            </label>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password..."
              autoFocus
              autoComplete="current-password"
              className="
                w-full px-4 py-3
                bg-maroon-950/40 border border-gold-700/20 rounded-sm
                text-cream-200/80 font-sans text-sm
                placeholder:text-cream-200/20
                focus:outline-none focus:border-gold-600/50
                transition-colors duration-300
              "
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400/80 text-xs font-sans text-center">
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3.5
              border border-gold-600/60
              text-gold-400 font-serif text-sm tracking-widest
              hover:bg-gold-600/10 transition-all duration-500
              rounded-sm disabled:opacity-50 disabled:cursor-not-allowed
              relative overflow-hidden group
            ">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                Memverifikasi...
              </span>
            ) : (
              <span className="relative z-10">Masuk</span>
            )}
          </button>
        </form>

        <p className="text-center text-cream-200/20 text-xs font-sans italic">
          Halaman ini hanya untuk panitia acara.
          <br />
          Session aktif selama 12 jam.
        </p>
      </motion.div>
    </main>
  );
}
