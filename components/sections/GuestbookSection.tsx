"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getGuestbook, getStats } from "@/lib/rsvp";
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

  useEffect(() => {
    const load = async () => {
      const [book, stat] = await Promise.all([getGuestbook(), getStats()]);
      setEntries(book);
      setStats(stat);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <section className="py-20 px-6 bg-maroon-950 text-center">
      <BatikBorder position="top" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto">
        <p className="text-gold-500/70 text-xs uppercase tracking-[0.4em] font-sans">
          Ucapan &amp; Doa
        </p>
        <GoldDivider />
        <h2 className="font-serif text-3xl text-cream-100 mt-4 mb-8">
          Buku Tamu
        </h2>

        {/* Statistik */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {[
            { label: "Total RSVP", value: stats.totalRsvp },
            { label: "Estimasi Hadir", value: `${stats.totalGuests} orang` },
          ].map((s) => (
            <div
              key={s.label}
              className="border border-gold-700/25 bg-[#1a0a0a]/50 p-4 rounded-sm">
              <p className="font-serif text-3xl text-gold-400">{s.value}</p>
              <p className="text-cream-200/40 text-xs font-sans mt-1 tracking-widest uppercase">
                {s.label}
              </p>
            </div>
          ))}
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

          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
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
        </div>
      </motion.div>

      <BatikBorder position="bottom" />
    </section>
  );
}
