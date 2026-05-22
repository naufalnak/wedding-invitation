"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface Props {
  token: string;
  guestName: string;
}

export default function QrCodeDisplay({ token, guestName }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // QRCodeCanvas render <canvas> di dalam div
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;

    // Buat canvas baru dengan padding & background putih
    const padding = 24;
    const size = canvas.width;
    const total = size + padding * 2;

    const out = document.createElement("canvas");
    out.width = total;
    out.height = total;

    const ctx = out.getContext("2d");
    if (!ctx) return;

    // Background putih
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, total, total);

    // Tempel QR di tengah
    ctx.drawImage(canvas, padding, padding, size, size);

    // Download
    const link = document.createElement("a");
    link.download = `qr-undangan-${guestName.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = out.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border border-gold-700/30 bg-maroon-950/60 rounded-sm">
      <p className="text-gold-400/80 text-xs uppercase tracking-widest font-sans">
        QR Code Check-in Anda
      </p>

      {/* Pakai QRCodeCanvas bukan QRCodeSVG */}
      <div
        ref={canvasRef}
        className="p-4 bg-white rounded-sm border-2 border-gold-600/40">
        <QRCodeCanvas
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
        Unduh QR Code (PNG)
      </button>
    </div>
  );
}
