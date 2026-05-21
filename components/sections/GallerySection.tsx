"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GoldDivider from "@/components/ornament/GoldDivider";

// Ganti src dengan foto prewedding asli, atau pakai placeholder sementara
const PHOTOS = [
  { src: "https://picsum.photos/seed/wedding1/600/800", alt: "Foto 1" },
  { src: "https://picsum.photos/seed/wedding2/600/800", alt: "Foto 2" },
  { src: "https://picsum.photos/seed/wedding3/600/800", alt: "Foto 3" },
  { src: "https://picsum.photos/seed/wedding4/600/800", alt: "Foto 4" },
  { src: "https://picsum.photos/seed/wedding5/600/800", alt: "Foto 5" },
  { src: "https://picsum.photos/seed/wedding6/600/800", alt: "Foto 6" },
];

export default function GallerySection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="py-20 px-6 bg-maroon-950 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-lg mx-auto">
        <p className="text-gold-500/70 text-xs uppercase tracking-[0.4em] font-sans">
          Momen Kami
        </p>
        <GoldDivider />
        <h2 className="font-serif text-3xl text-cream-100 mt-4 mb-10">
          Galeri Foto
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setSelected(photo.src)}
              className="relative aspect-[3/4] cursor-pointer overflow-hidden rounded-sm border border-gold-700/20 group">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 300px"
              />
              <div className="absolute inset-0 bg-maroon-950/20 group-hover:bg-maroon-950/0 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-sm aspect-[3/4]"
              onClick={(e) => e.stopPropagation()}>
              <Image
                src={selected}
                alt="Foto diperbesar"
                fill
                className="object-contain rounded-sm"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-cream-200 flex items-center justify-center text-lg"
                aria-label="Tutup foto">
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
