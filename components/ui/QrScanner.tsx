"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

interface Props {
  onScan: (result: string) => void;
  active: boolean;
}

export default function QrScanner({ onScan, active }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<{ stop: () => void } | null>(null);
  const scannedRef = useRef(false); // ← guard scan sekali
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!active || !videoRef.current) return;

    // Reset guard setiap kali scanner diaktifkan
    scannedRef.current = false;
    setError(null);

    const reader = new BrowserQRCodeReader();

    reader
      .decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
        // Kalau sudah scan sekali, abaikan semua hasil berikutnya
        if (scannedRef.current) return;

        if (result) {
          scannedRef.current = true;
          // Stop scanner segera sebelum callback parent
          controlsRef.current?.stop();
          controlsRef.current = null;
          onScan(result.getText());
          return;
        }

        if (err && err.name !== "NotFoundException") {
          setError(
            "Kamera tidak dapat diakses. Pastikan izin kamera diberikan.",
          );
        }
      })
      .then((controls) => {
        controlsRef.current = controls;
      })
      .catch(() => {
        setError("Gagal memulai kamera. Coba refresh halaman.");
      });

    return () => {
      controlsRef.current?.stop();
      controlsRef.current = null;
    };
  }, [active]); // ← hapus onScan dari dep agar tidak re-run

  if (error) {
    return (
      <div className="w-full aspect-square max-w-xs mx-auto flex items-center justify-center bg-maroon-950/60 border border-red-800/40 rounded-sm p-6 text-center">
        <p className="text-red-400/80 font-sans text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-xs mx-auto aspect-square overflow-hidden rounded-sm border border-gold-700/30 bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
      />

      {/* Overlay bidik */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-48 h-48">
          {(
            ["top-left", "top-right", "bottom-left", "bottom-right"] as const
          ).map((pos) => (
            <ScanCorner key={pos} position={pos} />
          ))}
          <div
            className="absolute inset-x-0 h-px bg-gold-500/70"
            style={{ animation: "scanLine 2s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scanLine {
          0%   { top: 0%; }
          50%  { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </div>
  );
}

function ScanCorner({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const base = "absolute w-6 h-6";
  const classes = {
    "top-left": `${base} top-0 left-0     border-t-2 border-l-2 border-gold-400 rounded-tl`,
    "top-right": `${base} top-0 right-0    border-t-2 border-r-2 border-gold-400 rounded-tr`,
    "bottom-left": `${base} bottom-0 left-0  border-b-2 border-l-2 border-gold-400 rounded-bl`,
    "bottom-right": `${base} bottom-0 right-0 border-b-2 border-r-2 border-gold-400 rounded-br`,
  }[position];
  return <div className={classes} />;
}
