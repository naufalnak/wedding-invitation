"use client";

import { useState, useRef, useEffect } from "react";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/background.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Matikan musik" : "Putar musik"}
      className="
        fixed bottom-6 right-6 z-50
        w-12 h-12 rounded-full
        bg-maroon-900 border border-gold-600/50
        flex items-center justify-center
        shadow-lg hover:border-gold-400
        transition-all duration-300
      ">
      {/* Animasi equalizer saat playing */}
      {playing ? (
        <div className="flex items-end gap-0.5 h-5">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-1 bg-gold-500 rounded-full"
              style={{
                height: `${i * 4 + 4}px`,
                animation: `bounce ${0.4 + i * 0.1}s ease-in-out infinite alternate`,
              }}
            />
          ))}
          <style>{`
            @keyframes bounce {
              from { transform: scaleY(0.4); }
              to   { transform: scaleY(1); }
            }
          `}</style>
        </div>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d4a40e"
          strokeWidth="1.8"
          strokeLinecap="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )}
    </button>
  );
}
