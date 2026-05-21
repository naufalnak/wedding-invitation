"use client";

import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  token: string;
  guestName: string;
}

export default function QrCodeDisplay({ token, guestName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-undangan-${guestName.toLowerCase().replace(/\s+/g, "-")}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border border-gold-700/30 bg-maroon-950/60 rounded-sm">
      <p className="text-gold-400/80 text-xs uppercase tracking-widest font-sans">
        QR Code Check-in Anda
      </p>

      {/* QR dengan border emas */}
      <div
        ref={containerRef}
        className="p-4 bg-white rounded-sm border-2 border-gold-600/40">
        <QRCodeSVG
          value={token}
          size={180}
          bgColor="#ffffff"
          fgColor="#1a0a0a"
          level="M"
        />
      </div>

      <p className="text-cream-200/40 text-xs font-mono text-center break-all px-2">
        Token: {token}
      </p>

      <p className="text-cream-200/60 font-serif text-sm text-center leading-relaxed">
        Tunjukkan QR ini kepada panitia saat tiba di lokasi acara.
      </p>

      <button
        onClick={handleDownload}
        className="
          flex items-center gap-2 px-5 py-2.5
          border border-gold-600/50 text-gold-400
          hover:bg-gold-600/10 transition-colors duration-300
          font-sans text-xs tracking-widest rounded-sm
        ">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Unduh QR Code
      </button>
    </div>
  );
}
