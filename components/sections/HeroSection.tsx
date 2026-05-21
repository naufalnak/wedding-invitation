"use client";

import { motion } from "framer-motion";
import GoldDivider from "@/components/ornament/GoldDivider";
import BatikBorder from "@/components/ornament/BatikBorder";

export default function HeroSection() {
  return (
    <section className="relative bg-maroon-950 py-24 px-6 text-center overflow-hidden">
      <BatikBorder position="top" />

      {/* Foto background blur — opsional, ganti src dengan foto asli */}
      <div className="absolute inset-0 opacity-5 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-lg mx-auto space-y-6">
        <p className="text-gold-500/70 text-xs uppercase tracking-[0.4em] font-sans">
          Bismillahirrahmanirrahim
        </p>

        <GoldDivider />

        <p className="text-cream-200/70 font-serif text-base leading-relaxed">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang kehadiran
          Bapak/Ibu/Saudara/i dalam acara pernikahan putra-putri kami:
        </p>

        {/* Nama Mempelai */}
        <div className="py-8 space-y-2">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-script text-6xl text-gold-400 leading-tight"
            style={{ fontFamily: "var(--font-great-vibes)" }}>
            Rizky Firmansyah
          </motion.h1>

          <p className="text-cream-200/50 font-serif text-sm">
            Putra dari Bapak H. Ahmad & Ibu Hj. Siti
          </p>

          <div className="flex items-center justify-center my-6 gap-4">
            <div className="h-px w-12 bg-gold-700/40" />
            <p className="text-gold-500 font-serif text-3xl italic">&amp;</p>
            <div className="h-px w-12 bg-gold-700/40" />
          </div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-script text-6xl text-gold-400 leading-tight"
            style={{ fontFamily: "var(--font-great-vibes)" }}>
            Amira Kusumastuti
          </motion.h1>

          <p className="text-cream-200/50 font-serif text-sm">
            Putri dari Bapak Drs. Bambang & Ibu Dra. Wulandari
          </p>
        </div>

        <GoldDivider />

        <p className="text-cream-200/60 font-serif text-sm italic">
          Sabtu, 14 Juni 2025
        </p>
      </motion.div>

      <BatikBorder position="bottom" />
    </section>
  );
}
