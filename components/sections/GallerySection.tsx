"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GoldDivider from "@/components/ornament/GoldDivider";
import { getGalleryPhotos } from "@/lib/rsvp";

interface Photo {
  url: string;
  caption: string;
  alt: string;
}

// Skeleton card saat loading
function PhotoSkeleton() {
  return (
    <div className="aspect-[3/4] rounded-sm bg-maroon-900/40 border border-gold-700/10 animate-pulse" />
  );
}

export default function GallerySection() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Photo | null>(null);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    getGalleryPhotos().then((data) => {
      setPhotos(data);
      setLoading(false);
    });
  }, []);

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

        {/* Grid foto */}
        <div className="grid grid-cols-2 gap-2">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <PhotoSkeleton key={i} />)
            : photos.map((photo, i) => (
                <motion.div
                  key={photo.url}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  onClick={() => setSelected(photo)}
                  className="relative aspect-[3/4] cursor-pointer overflow-hidden rounded-sm border border-gold-700/20 group">
                  {imgError[photo.url] ? (
                    // Fallback kalau foto belum diupload
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-maroon-900/60 gap-2">
                      <p className="text-gold-700/50 text-3xl">✦</p>
                      <p className="text-cream-200/20 text-xs font-sans px-3">
                        {photo.alt}
                      </p>
                    </div>
                  ) : (
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 300px"
                      onError={() =>
                        setImgError((prev) => ({ ...prev, [photo.url]: true }))
                      }
                    />
                  )}

                  {/* Overlay caption */}
                  <div
                    className="
                    absolute inset-x-0 bottom-0
                    bg-gradient-to-t from-black/70 to-transparent
                    p-3 translate-y-full group-hover:translate-y-0
                    transition-transform duration-500
                  ">
                    <p className="text-cream-100 font-serif text-xs italic">
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
        </div>

        {photos.length === 0 && !loading && (
          <p className="text-cream-200/30 font-serif text-sm italic py-8">
            Foto sedang disiapkan.
          </p>
        )}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}>
              {/* Foto */}
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-gold-700/20">
                <Image
                  src={selected.url}
                  alt={selected.alt}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>

              {/* Caption */}
              {selected.caption && (
                <p className="mt-3 text-cream-200/60 font-serif text-sm italic text-center">
                  {selected.caption}
                </p>
              )}

              {/* Navigasi prev/next */}
              {photos.length > 1 && (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = photos.findIndex(
                        (p) => p.url === selected.url,
                      );
                      setSelected(
                        photos[(idx - 1 + photos.length) % photos.length],
                      );
                    }}
                    className="px-4 py-2 border border-gold-700/30 text-gold-400 text-sm rounded-sm hover:bg-gold-600/10 transition-colors">
                    ← Sebelumnya
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = photos.findIndex(
                        (p) => p.url === selected.url,
                      );
                      setSelected(photos[(idx + 1) % photos.length]);
                    }}
                    className="px-4 py-2 border border-gold-700/30 text-gold-400 text-sm rounded-sm hover:bg-gold-600/10 transition-colors">
                    Berikutnya →
                  </button>
                </div>
              )}

              {/* Tombol tutup */}
              <button
                onClick={() => setSelected(null)}
                className="
                  absolute -top-3 -right-3
                  w-8 h-8 rounded-full
                  bg-maroon-900 border border-gold-700/30
                  text-cream-200/70 text-lg
                  flex items-center justify-center
                  hover:border-gold-500/50 transition-colors
                "
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
