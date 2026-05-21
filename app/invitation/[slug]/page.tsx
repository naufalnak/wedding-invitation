import { supabase } from "@/lib/supabaseClient";
import { Guest } from "@/lib/types";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getGuest(slug: string): Promise<Guest | null> {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as Guest;
}

export default async function InvitationPage({ params }: Props) {
  const { slug } = await params;
  const guest = await getGuest(slug);

  if (!guest) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#1a0a0a] flex items-center justify-center p-8">
      <div className="text-center space-y-4 border border-yellow-700/40 p-10 rounded-lg max-w-md w-full">
        <p className="text-amber-400/70 text-sm tracking-widest uppercase font-sans">
          Undangan Pernikahan
        </p>
        <h1 className="text-cream-100 font-serif text-3xl">Kepada Yth.</h1>
        <h2 className="text-gold-400 font-serif text-2xl italic">
          {guest!.name} &amp; Keluarga
        </h2>
        <p className="text-cream-200/60 text-sm mt-4">
          Sugeng rawuh — halaman sedang disiapkan
        </p>
        <p className="text-cream-200/40 text-xs mt-2 font-mono">
          slug: {slug} · max tamu: {guest!.max_guest}
        </p>
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guest = await getGuest(slug);
  return {
    title: guest
      ? `Undangan untuk ${guest.name} | Rizky & Amira`
      : "Undangan Tidak Ditemukan",
  };
}
