import { supabase } from "@/lib/supabaseClient";
import { Guest } from "@/lib/types";
import { notFound } from "next/navigation";
import InvitationClient from "./InvitationClient";

interface Props {
  params: { slug: string };
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
  const { slug } = params;
  const guest = await getGuest(slug);
  if (!guest) notFound();

  return <InvitationClient guest={guest} />;
}

export async function generateMetadata({ params }: Props) {
  const guest = await getGuest(params.slug);

  const title = guest
    ? `Undangan untuk ${guest.name} | Rizky & Amira`
    : "Undangan Tidak Ditemukan";

  const description = guest
    ? `Kepada Yth. ${guest.name} & Keluarga — Kami mengundang kehadiran Anda dalam acara pernikahan Rizky & Amira, Sabtu 14 Juni 2025 di Surabaya.`
    : "Undangan pernikahan tidak ditemukan.";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const pageUrl = `${baseUrl}/invitation/${params.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      // OG image di-generate otomatis dari opengraph-image.tsx
      // Next.js akan append URL-nya sendiri
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
