"use client";

import { motion } from "framer-motion";
import GoldDivider from "@/components/ornament/GoldDivider";

const STORY = [
  {
    year: "2018",
    title: "Pertemuan Pertama",
    desc: "Kami dipertemukan dalam sebuah acara seminar di Universitas Airlangga. Sebuah perkenalan sederhana yang menjadi awal dari segalanya.",
    icon: "✦",
  },
  {
    year: "2019",
    title: "Persahabatan",
    desc: "Dari teman seminar menjadi sahabat karib. Kami sering berbagi cerita dan mimpi tentang masa depan.",
    icon: "✦",
  },
  {
    year: "2021",
    title: "Lebih dari Sahabat",
    desc: "Dengan restu kedua orang tua, kami resmi menjalin hubungan dan berkomitmen untuk melangkah bersama.",
    icon: "✦",
  },
  {
    year: "2024",
    title: "Lamaran",
    desc: "Pada hari yang penuh keberkahan, Rizky melamar Amira dengan penuh ketulusan hati di hadapan keluarga.",
    icon: "✦",
  },
  {
    year: "2025",
    title: "Pernikahan",
    desc: "Kini kami siap melangkah ke jenjang yang lebih sakral dan bermakna. Matur nuwun atas doa dan restunya.",
    icon: "♥",
  },
];

export default function LoveStorySection() {
  return (
    <section className="py-20 px-6 bg-maroon-950 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto">
        <p className="text-gold-500/70 text-xs uppercase tracking-[0.4em] font-sans">
          Kisah Cinta Kami
        </p>
        <GoldDivider />
        <h2 className="font-serif text-3xl text-cream-100 mt-4 mb-12">
          Love Story
        </h2>

        <div className="relative">
          {/* Garis tengah */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold-700/20 -translate-x-1/2" />

          <div className="space-y-10">
            {STORY.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`flex items-center gap-4 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                  {/* Kartu */}
                  <div className="flex-1">
                    <div
                      className={`
                      border border-gold-700/25 bg-[#1a0a0a]/60 p-4 rounded-sm
                      ${isLeft ? "text-right" : "text-left"}
                    `}>
                      <p className="text-gold-500 text-xs font-sans tracking-widest mb-1">
                        {item.year}
                      </p>
                      <p className="text-cream-100 font-serif text-base mb-1">
                        {item.title}
                      </p>
                      <p className="text-cream-200/50 font-sans text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Titik tengah */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-maroon-900 border border-gold-600/50 flex items-center justify-center text-gold-500 text-xs z-10">
                    {item.icon}
                  </div>

                  {/* Sisi kosong */}
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
