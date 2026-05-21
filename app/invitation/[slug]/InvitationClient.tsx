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
            {/* Week 3: RsvpSection & GuestbookSection ditambahkan di sini */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music toggle selalu tampil */}
      {isOpen && <MusicToggle />}
    </>
  );
}
