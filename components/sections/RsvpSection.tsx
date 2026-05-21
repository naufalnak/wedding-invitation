"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitRsvp } from "@/lib/rsvp";
import { Guest, Rsvp } from "@/lib/types";
import GoldDivider from "@/components/ornament/GoldDivider";
import QrCodeDisplay from "@/components/ui/QrCodeDisplay";

interface Props {
  guest: Guest;
}

type Step = "form" | "loading" | "success" | "already" | "error";

export default function RsvpSection({ guest }: Props) {
  const [step, setStep] = useState<Step>("form");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [rsvpData, setRsvpData] = useState<Rsvp | null>(null);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrMsg("Mohon tuliskan ucapan Anda.");
      return;
    }
    setErrMsg("");
    setStep("loading");

    const { data, error } = await submitRsvp({
      guestId: guest.id,
      guestCount,
      message,
    });

    if (error === "already_exists" && data) {
      setRsvpData(data);
      setStep("already");
      return;
    }

    if (error || !data) {
      setStep("error");
      return;
    }

    setRsvpData(data);
    setStep("success");
  };

  return (
    <section className="py-20 px-6 bg-[#1a0a0a] text-center" id="rsvp">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto">
        <p className="text-gold-500/70 text-xs uppercase tracking-[0.4em] font-sans">
          Konfirmasi Kehadiran
        </p>
        <GoldDivider />
        <h2 className="font-serif text-3xl text-cream-100 mt-4 mb-2">RSVP</h2>
        <p className="text-cream-200/50 font-serif text-sm mb-10 italic">
          Mohon konfirmasi kehadiran Anda paling lambat 7 Juni 2025
        </p>

        {/* ── FORM ─────────────────────────────── */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* Nama tamu — read only dari DB */}
            <div>
              <label className="block text-gold-400/70 text-xs uppercase tracking-widest font-sans mb-2">
                Nama Tamu
              </label>
              <div className="w-full px-4 py-3 bg-maroon-950/40 border border-gold-700/20 rounded-sm text-cream-200/60 font-serif text-sm">
                {guest.name} &amp; Keluarga
              </div>
            </div>

            {/* Jumlah tamu */}
            <div>
              <label className="block text-gold-400/70 text-xs uppercase tracking-widest font-sans mb-2">
                Jumlah Tamu yang Hadir
                <span className="text-cream-200/30 ml-2 normal-case">
                  (maks. {guest.max_guest} orang)
                </span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                  className="w-10 h-10 border border-gold-700/30 text-gold-400 rounded-sm hover:bg-gold-600/10 transition-colors text-lg flex items-center justify-center"
                  aria-label="Kurangi">
                  −
                </button>
                <span className="flex-1 text-center font-serif text-2xl text-cream-100">
                  {guestCount}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setGuestCount((c) => Math.min(guest.max_guest, c + 1))
                  }
                  className="w-10 h-10 border border-gold-700/30 text-gold-400 rounded-sm hover:bg-gold-600/10 transition-colors text-lg flex items-center justify-center"
                  aria-label="Tambah">
                  +
                </button>
              </div>
              {/* Progress bar visual */}
              <div className="mt-2 w-full h-1 bg-maroon-900/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-600/60 rounded-full transition-all duration-300"
                  style={{ width: `${(guestCount / guest.max_guest) * 100}%` }}
                />
              </div>
              <p className="text-cream-200/30 text-xs font-sans mt-1 text-right">
                {guestCount} dari {guest.max_guest} kursi
              </p>
            </div>

            {/* Ucapan */}
            <div>
              <label className="block text-gold-400/70 text-xs uppercase tracking-widest font-sans mb-2">
                Ucapan &amp; Doa
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                maxLength={300}
                placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                className="
                  w-full px-4 py-3 bg-maroon-950/40
                  border border-gold-700/20 rounded-sm
                  text-cream-200/80 font-sans text-sm
                  placeholder:text-cream-200/20
                  focus:outline-none focus:border-gold-600/50
                  resize-none transition-colors duration-300
                "
              />
              <p className="text-cream-200/20 text-xs font-sans mt-1 text-right">
                {message.length}/300
              </p>
            </div>

            {errMsg && (
              <p className="text-red-400/80 text-xs font-sans text-center">
                {errMsg}
              </p>
            )}

            <button
              type="submit"
              className="
                w-full py-3.5 border border-gold-600/60
                text-gold-400 font-serif text-sm tracking-widest
                hover:bg-gold-600/10 transition-all duration-500
                rounded-sm relative overflow-hidden group
              ">
              <span className="relative z-10">Konfirmasi Kehadiran</span>
              <span
                className="
                absolute inset-0 bg-gold-500/5
                translate-x-[-100%] group-hover:translate-x-0
                transition-transform duration-500
              "
              />
            </button>
          </form>
        )}

        {/* ── LOADING ──────────────────────────── */}
        {step === "loading" && (
          <div className="py-12 space-y-4">
            <div className="w-10 h-10 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto" />
            <p className="text-cream-200/50 font-serif text-sm italic">
              Menyimpan konfirmasi...
            </p>
          </div>
        )}

        {/* ── SUCCESS ──────────────────────────── */}
        {step === "success" && rsvpData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6">
            <div className="space-y-2">
              <p className="text-gold-400 text-2xl">✦</p>
              <h3 className="font-serif text-2xl text-cream-100">
                Terima Kasih!
              </h3>
              <p className="text-cream-200/60 font-serif text-sm italic">
                Kami sangat menantikan kehadiran Anda.
                <br />
                <span className="text-gold-400/70">Matur nuwun</span> atas doa
                dan restunya.
              </p>
            </div>
            <GoldDivider />
            <QrCodeDisplay token={rsvpData.qr_token} guestName={guest.name} />
          </motion.div>
        )}

        {/* ── ALREADY EXISTS ───────────────────── */}
        {step === "already" && rsvpData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6">
            <div className="space-y-2">
              <p className="text-gold-400 text-2xl">◈</p>
              <h3 className="font-serif text-2xl text-cream-100">
                Anda Sudah Terdaftar
              </h3>
              <p className="text-cream-200/60 font-serif text-sm italic">
                Berikut adalah QR Code Anda sebelumnya.
              </p>
            </div>
            <GoldDivider />
            <QrCodeDisplay token={rsvpData.qr_token} guestName={guest.name} />
          </motion.div>
        )}

        {/* ── ERROR ────────────────────────────── */}
        {step === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 py-8">
            <p className="text-red-400/80 font-serif text-lg">
              Terjadi kesalahan
            </p>
            <p className="text-cream-200/40 font-sans text-sm">
              Mohon maaf, gagal menyimpan konfirmasi. Silakan coba lagi.
            </p>
            <button
              onClick={() => setStep("form")}
              className="px-6 py-2.5 border border-gold-700/30 text-gold-400 text-sm rounded-sm hover:bg-gold-600/10 transition-colors">
              Coba Lagi
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
