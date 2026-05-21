export type Guest = {
  id: string;
  name: string;
  slug: string;
  max_guest: number;
};

export type Rsvp = {
  id: string;
  guest_id: string;
  guest_count: number;
  message: string;
  qr_token: string;
  checked_in: boolean;
  checked_in_count: number;
  created_at: string;
  guests?: Guest;
};

export type RsvpWithGuest = Rsvp & {
  guests: Pick<Guest, "name" | "max_guest">;
};
