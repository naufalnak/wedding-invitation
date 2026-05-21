-- Data tamu dummy
insert into guests (name, slug, max_guest) values
  ('Budi Santoso',      'budi',          4),
  ('Andi Pratama',      'andi-pratama',  2),
  ('Siti Rahayu',       'siti-rahayu',   3),
  ('Keluarga Wijaya',   'wijaya',        6),
  ('Dewi Kusuma',       'dewi-kusuma',   2)
on conflict (slug) do nothing;

-- Data RSVP dummy (opsional, untuk test buku tamu)
insert into rsvps (guest_id, guest_count, message, qr_token)
select
  id,
  2,
  'Semoga menjadi keluarga yang sakinah mawaddah warahmah. Aamiin.',
  'TEST-TOKEN-BUDI-001'
from guests where slug = 'budi'
on conflict (qr_token) do nothing;

insert into rsvps (guest_id, guest_count, message, qr_token)
select
  id,
  1,
  'Selamat menempuh hidup baru, semoga bahagia selalu!',
  'TEST-TOKEN-ANDI-001'
from guests where slug = 'andi-pratama'
on conflict (qr_token) do nothing;