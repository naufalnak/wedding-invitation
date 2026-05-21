"use client";

import { motion } from "framer-motion";
import GoldDivider from "@/components/ornament/GoldDivider";

interface Props {
  guestName: string;
  onOpen: () => void;
}

export default function CoverSection({ guestName, onOpen }: Props) {
  return (
    <section
      className="
      relative min-h-screen flex flex-col items-center justify-center
      bg-[#1a0a0a] overflow-hidden px-6 text-center
    ">
      {/* Lingkaran dekoratif latar */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-gold-700/10" />
        <div className="absolute w-[450px] h-[450px] rounded-full border border-gold-700/15" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-gold-700/20" />
      </div>

      {/* Sudut ornamen */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      {/* Konten */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 space-y-6 max-w-sm">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="text-gold-500/70 text-xs uppercase tracking-[0.4em] font-sans">
          Undangan Pernikahan
        </motion.p>

        <GoldDivider />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-cream-200/70 font-serif text-base">
          Kepada Yth.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif text-2xl text-gold-300 italic">
          {guestName} &amp; Keluarga
        </motion.h2>

        <GoldDivider />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="font-serif text-3xl text-cream-100">
          Rizky
          <span className="text-gold-500 mx-3 text-2xl">&amp;</span>
          Amira
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-cream-200/50 font-serif text-sm italic">
          Sabtu, 14 Juni 2025
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="pt-4">
          <button
            onClick={onOpen}
            className="
              px-8 py-3 border border-gold-600/60
              text-gold-400 font-serif text-sm tracking-widest
              hover:bg-gold-600/10 hover:border-gold-400
              transition-all duration-500 rounded-sm
              relative overflow-hidden group
            ">
            <span className="relative z-10">Buka Undangan</span>
            <span
              className="
              absolute inset-0 bg-gold-500/5
              translate-x-[-100%] group-hover:translate-x-0
              transition-transform duration-500
            "
            />
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="text-cream-200/30 text-xs font-sans italic">
          Sugeng rawuh
        </motion.p>
      </motion.div>
    </section>
  );
}

function CornerOrnament({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const posClass = {
    "top-left": "top-6 left-6",
    "top-right": "top-6 right-6 rotate-90",
    "bottom-left": "bottom-6 left-6 -rotate-90",
    "bottom-right": "bottom-6 right-6 rotate-180",
  }[position];

  return (
    <div
      className={`absolute ${posClass} w-16 h-16 opacity-40 pointer-events-none`}>
      <svg viewBox="0 0 60 60" fill="none">
        <path d="M2 2 L2 22" stroke="#d4a40e" strokeWidth="1" />
        <path d="M2 2 L22 2" stroke="#d4a40e" strokeWidth="1" />
        <path
          d="M2 2 L12 12"
          stroke="#d4a40e"
          strokeWidth="0.5"
          strokeDasharray="2 3"
        />
        <circle cx="22" cy="2" r="1.5" fill="#d4a40e" />
        <circle cx="2" cy="22" r="1.5" fill="#d4a40e" />
        <circle cx="2" cy="2" r="2" fill="#d4a40e" />
      </svg>
    </div>
  );
}
