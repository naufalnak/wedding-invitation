import { supabase } from "@/lib/supabaseClient";
import { Guest } from "@/lib/types";
import { notFound } from "next/navigation";
import InvitationClient from "./InvitationClient";

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
  if (!guest) notFound();

  return <InvitationClient guest={guest} />;
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
