"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getGuestbook, getStats } from "@/lib/rsvp";
import { supabase } from "@/lib/supabaseClient";
import { Rsvp } from "@/lib/types";
import GoldDivider from "@/components/ornament/GoldDivider";
import BatikBorder from "@/components/ornament/BatikBorder";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "Baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  return `${days} hari lalu`;
}

export default function GuestbookSection() {
  const [entries, setEntries] = useState<Rsvp[]>([]);
  const [stats, setStats] = useState({ totalRsvp: 0, totalGuests: 0 });
  const [loading, setLoading] = useState(true);
  const [newCount, setNewCount] = useState(0); // badge notif entry baru
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // ── Initial load ─────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      const [book, stat] = await Promise.all([getGuestbook(), getStats()]);
      setEntries(book);
      setStats(stat);
      setLoading(false);
    };
    load();
  }, []);

  // ── Supabase Realtime subscription ───────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel("rsvps-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "rsvps",
        },
        async (payload) => {
          const newRsvp = payload.new as Rsvp;

          // Kalau tidak ada pesan, skip (tidak perlu masuk buku tamu)
          if (!newRsvp.message || newRsvp.message.trim() === "") return;

          // Fetch nama tamu dari tabel guests berdasarkan guest_id
          const { data: guestData } = await supabase
            .from("guests")
            .select("id, name, slug, max_guest")
            .eq("id", newRsvp.guest_id)
            .single();

          const enriched: Rsvp = {
            ...newRsvp,
            guests: guestData ?? undefined,
          };

          // Prepend ke list (terbaru di atas)
          setEntries((prev) => [enriched, ...prev]);

          // Update statistik
          setStats((prev) => ({
            totalRsvp: prev.totalRsvp + 1,
            totalGuests: prev.totalGuests + (newRsvp.guest_count ?? 0),
          }));

          // Tambah badge notif
          setNewCount((c) => c + 1);
        },
      )
      .subscribe();

    channelRef.current = channel;

    // Cleanup saat unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Reset badge notif setelah 4 detik
  useEffect(() => {
    if (newCount === 0) return;
    const t = setTimeout(() => setNewCount(0), 4000);
    return () => clearTimeout(t);
  }, [newCount]);

  return (
    <section className="py-20 px-6 bg-maroon-950 text-center">
      <BatikBorder position="top" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto">
        {/* Header + badge notif */}
        <p className="text-gold-500/70 text-xs uppercase tracking-[0.4em] font-sans">
          Ucapan &amp; Doa
        </p>
        <GoldDivider />
        <div className="flex items-center justify-center gap-3 mt-4 mb-8">
          <h2 className="font-serif text-3xl text-cream-100">Buku Tamu</h2>

          {/* Badge "N baru" muncul saat ada entry realtime */}
          <AnimatePresence>
            {newCount > 0 && (
              <motion.span
                key="badge"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="
                  px-2.5 py-0.5 rounded-full
                  bg-gold-600/20 border border-gold-600/40
                  text-gold-400 text-xs font-sans
                ">
                +{newCount} baru
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {[
            { label: "Total RSVP", value: stats.totalRsvp },
            { label: "Estimasi Hadir", value: `${stats.totalGuests} orang` },
          ].map((s) => (
            <motion.div
              key={s.label}
              layout
              className="border border-gold-700/25 bg-[#1a0a0a]/50 p-4 rounded-sm">
              <motion.p
                key={String(s.value)}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-3xl text-gold-400">
                {s.value}
              </motion.p>
              <p className="text-cream-200/40 text-xs font-sans mt-1 tracking-widest uppercase">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Indikator live */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="relative flex h-2 w-2">
            <span
              className="
              animate-ping absolute inline-flex h-full w-full
              rounded-full bg-gold-500 opacity-60
            "
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500" />
          </span>
          <p className="text-cream-200/30 text-xs font-sans">
            Live — memperbarui otomatis
          </p>
        </div>

        <GoldDivider />

        {/* Daftar ucapan */}
        <div className="mt-8 space-y-4 text-left">
          {loading && (
            <div className="py-8 flex justify-center">
              <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
            </div>
          )}

          {!loading && entries.length === 0 && (
            <p className="text-center text-cream-200/30 font-serif text-sm italic py-8">
              Belum ada ucapan. Jadilah yang pertama!
            </p>
          )}

          <AnimatePresence initial={false}>
            {entries.map((entry, i) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: -16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4, delay: loading ? i * 0.06 : 0 }}
                className="border border-gold-700/20 bg-[#1a0a0a]/40 p-4 rounded-sm space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-gold-300 font-serif text-sm">
                    {(entry.guests as { name?: string } | null)?.name ?? "Tamu"}
                  </p>
                  <span className="text-cream-200/25 text-xs font-sans">
                    {timeAgo(entry.created_at)}
                  </span>
                </div>
                <p className="text-cream-200/60 font-sans text-xs leading-relaxed">
                  {entry.message}
                </p>
                <p className="text-cream-200/20 text-xs font-sans">
                  {entry.guest_count} orang hadir
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <BatikBorder position="bottom" />
    </section>
  );
}
