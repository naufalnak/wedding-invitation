"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Guest } from "@/lib/types";

import CoverSection from "@/components/sections/CoverSection";
import HeroSection from "@/components/sections/HeroSection";
import CountdownSection from "@/components/sections/CountdownSection";
import LoveStorySection from "@/components/sections/LoveStorySection";
import EventSection from "@/components/sections/EventSection";
import GallerySection from "@/components/sections/GallerySection";
import RsvpSection from "@/components/sections/RsvpSection";
import GuestbookSection from "@/components/sections/GuestbookSection";
import MusicToggle from "@/components/ui/MusicToggle";

interface Props {
  guest: Guest;
}

export default function InvitationClient({ guest }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}>
            <CoverSection
              guestName={guest.name}
              onOpen={() => setIsOpen(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}>
            <HeroSection />
            <CountdownSection />
            <LoveStorySection />
            <EventSection />
            <GallerySection />
            <RsvpSection guest={guest} />
            <GuestbookSection />

            {/* Footer */}
            <footer className="py-10 px-6 bg-[#1a0a0a] text-center border-t border-gold-700/10">
              <p className="text-gold-500/50 text-xs uppercase tracking-widest font-sans mb-2">
                Rizky &amp; Amira · 14 Juni 2025
              </p>
              <p className="text-cream-200/25 text-xs font-serif italic">
                Atas kehadiran dan doa restunya, kami ucapkan terima kasih.
                <br />
                <span className="text-gold-400/40">Matur nuwun.</span>
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && <MusicToggle />}
    </>
  );
}
