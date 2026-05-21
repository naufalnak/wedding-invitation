export const metadata = {
  title: "Check-in Panitia | Rizky & Amira",
  robots: { index: false, follow: false },
};

export default function CheckinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#1a0a0a]">{children}</div>;
}
