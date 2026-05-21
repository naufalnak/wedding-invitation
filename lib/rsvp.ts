import { supabase } from "@/lib/supabaseClient";
import { nanoid } from "nanoid";
import { Rsvp } from "@/lib/types";

// ── Insert RSVP baru ──────────────────────────────────────────
export async function submitRsvp({
  guestId,
  guestCount,
  message,
}: {
  guestId: string;
  guestCount: number;
  message: string;
}): Promise<{ data: Rsvp | null; error: string | null }> {
  // Cek apakah tamu sudah pernah RSVP
  const { data: existing } = await supabase
    .from("rsvps")
    .select("id, qr_token")
    .eq("guest_id", guestId)
    .maybeSingle();

  if (existing) {
    return {
      data: existing as Rsvp,
      error: "already_exists",
    };
  }

  const qr_token = nanoid(16);

  const { data, error } = await supabase
    .from("rsvps")
    .insert({
      guest_id: guestId,
      guest_count: guestCount,
      message: message.trim(),
      qr_token,
    })
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  return { data: data as Rsvp, error: null };
}

// ── Ambil semua ucapan untuk buku tamu ───────────────────────
export async function getGuestbook(): Promise<Rsvp[]> {
  const { data, error } = await supabase
    .from("rsvps")
    .select("*, guests(name)")
    .not("message", "is", null)
    .neq("message", "")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error || !data) return [];
  return data as Rsvp[];
}

// ── Ambil statistik ──────────────────────────────────────────
export async function getStats(): Promise<{
  totalRsvp: number;
  totalGuests: number;
}> {
  const { data, error } = await supabase.from("rsvps").select("guest_count");

  if (error || !data) return { totalRsvp: 0, totalGuests: 0 };

  return {
    totalRsvp: data.length,
    totalGuests: data.reduce((sum, r) => sum + (r.guest_count ?? 0), 0),
  };
}

// ── Ambil RSVP by qr_token (untuk checkin) ───────────────────
export async function getRsvpByToken(token: string): Promise<Rsvp | null> {
  const { data, error } = await supabase
    .from("rsvps")
    .select("*, guests(name, max_guest)")
    .eq("qr_token", token)
    .single();

  if (error || !data) return null;
  return data as Rsvp;
}

// ── Update checkin ────────────────────────────────────────────
export async function checkInRsvp(
  rsvpId: string,
  guestCount: number,
): Promise<{ success: boolean; error: string | null }> {
  const { error } = await supabase
    .from("rsvps")
    .update({
      checked_in: true,
      checked_in_count: guestCount,
    })
    .eq("id", rsvpId);

  if (error) return { success: false, error: error.message };
  return { success: true, error: null };
}
