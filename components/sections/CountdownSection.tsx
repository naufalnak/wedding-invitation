"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import GoldDivider from "@/components/ornament/GoldDivider";

const WEDDING_DATE = new Date("2025-06-14T08:00:00+07:00");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const mounted = useIsMounted();

  useEffect(() => {
    const calc = () => {
      const diff = WEDDING_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 px-6 bg-[#1a0a0a] text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto space-y-8">
        <p className="text-gold-500/70 text-xs uppercase tracking-[0.4em] font-sans">
          Menuju Hari Bahagia
        </p>
        <GoldDivider />

        <div className="grid grid-cols-4 gap-3">
          {units.map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border border-gold-700/30 rounded-sm py-4 px-2 bg-maroon-950/40">
              <p className="font-serif text-4xl text-gold-400 tabular-nums">
                {pad(value)}
              </p>
              <p className="text-cream-200/40 text-xs font-sans mt-2 tracking-widest uppercase">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="text-cream-200/50 font-serif text-sm italic">
          Sabtu, 14 Juni 2025 · Surabaya, Jawa Timur
        </p>
      </motion.div>
    </section>
  );
}
