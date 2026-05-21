"use client";

import { motion } from "framer-motion";
import GoldDivider from "@/components/ornament/GoldDivider";
import BatikBorder from "@/components/ornament/BatikBorder";

const EVENTS = [
  {
    type: "Akad Nikah",
    date: "Sabtu, 14 Juni 2025",
    time: "08.00 – 10.00 WIB",
    venue: "Masjid Al-Akbar Surabaya",
    address: "Jl. Masjid Agung Tim. No.1, Pagesangan, Surabaya",
    icon: "☽",
  },
  {
    type: "Resepsi Pernikahan",
    date: "Sabtu, 14 Juni 2025",
    time: "11.00 – 14.00 WIB",
    venue: "Gedung Dyandra Convention Center",
    address: "Jl. Basuki Rahmat No.94, Embong Kaliasin, Surabaya",
    icon: "✦",
  },
];

export default function EventSection() {
  return (
    <section className="relative py-20 px-6 bg-[#1a0a0a] text-center overflow-hidden">
      <BatikBorder position="top" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto">
        <p className="text-gold-500/70 text-xs uppercase tracking-[0.4em] font-sans">
          Detail Acara
        </p>
        <GoldDivider />
        <h2 className="font-serif text-3xl text-cream-100 mt-4 mb-12">
          Jadwal Acara
        </h2>

        <div className="space-y-6">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="border border-gold-700/30 bg-maroon-950/40 p-6 rounded-sm space-y-3">
              <div className="text-gold-500 text-2xl">{event.icon}</div>
              <h3 className="font-serif text-xl text-gold-300">{event.type}</h3>
              <GoldDivider />
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2 text-cream-200/80 font-serif">
                  <span className="text-gold-600/60">◈</span>
                  {event.date}
                </div>
                <div className="flex items-center justify-center gap-2 text-cream-200/80 font-serif">
                  <span className="text-gold-600/60">◈</span>
                  {event.time}
                </div>
                <div className="pt-2">
                  <p className="text-cream-100 font-serif text-base">
                    {event.venue}
                  </p>
                  <p className="text-cream-200/40 font-sans text-xs mt-1">
                    {event.address}
                  </p>
                </div>
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(event.venue + " " + event.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-block mt-2 px-5 py-2 text-xs
                  border border-gold-700/40 text-gold-400
                  hover:bg-gold-600/10 transition-colors duration-300
                  font-sans tracking-widest rounded-sm
                ">
                Buka Peta
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Google Maps Embed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-10 max-w-lg mx-auto rounded-sm overflow-hidden border border-gold-700/25">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.6!2d112.7378!3d-7.3119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381ac47f%3A0x162523dc3f28c98d!2sMasjid+Al-Akbar+Surabaya!5e0!3m2!1sid!2sid!4v1"
          width="100%"
          height="220"
          style={{ border: 0, filter: "grayscale(60%) sepia(20%)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Akad Nikah — Masjid Al-Akbar Surabaya"
        />
      </motion.div>

      <BatikBorder position="bottom" />
    </section>
  );
}
