import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Undangan Pernikahan | Rizky & Amira",
  description:
    "Dengan penuh syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.",
  openGraph: {
    title: "Undangan Pernikahan | Rizky & Amira",
    description: "Kami mengundang kehadiran Anda dalam momen bahagia kami.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-black text-cream-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
