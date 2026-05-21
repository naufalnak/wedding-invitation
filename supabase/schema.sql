-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Tabel guests
create table if not exists guests (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  slug       text not null unique,
  max_guest  int  not null default 2
);

-- Tabel rsvps
create table if not exists rsvps (
  id               uuid      primary key default uuid_generate_v4(),
  guest_id         uuid      not null references guests(id) on delete cascade,
  guest_count      int       not null default 1,
  message          text,
  qr_token         text      not null unique,
  checked_in       boolean   not null default false,
  checked_in_count int       not null default 0,
  created_at       timestamp with time zone default now()
);

-- Index untuk performa query
create index if not exists idx_guests_slug       on guests(slug);
create index if not exists idx_rsvps_guest_id   on rsvps(guest_id);
create index if not exists idx_rsvps_qr_token   on rsvps(qr_token);

-- RLS (Row Level Security)
alter table guests enable row level security;
alter table rsvps  enable row level security;

-- Policy: baca guests boleh semua (untuk fetch by slug)
create policy "Allow public read guests"
  on guests for select using (true);

-- Policy: baca & insert rsvps boleh semua
create policy "Allow public read rsvps"
  on rsvps for select using (true);

create policy "Allow public insert rsvps"
  on rsvps for insert with check (true);

-- Policy: update rsvps (untuk checkin)
create policy "Allow public update rsvps"
  on rsvps for update using (true);