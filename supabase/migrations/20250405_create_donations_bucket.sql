
-- Create a storage bucket for donation screenshots
insert into storage.buckets (id, name, public)
values ('donations', 'donations', true);

-- Create a RLS policy to allow anyone to read from the bucket
create policy "Anyone can view donation screenshots"
on storage.objects for select
using (bucket_id = 'donations');

-- Create a RLS policy to allow authenticated users to upload to the bucket
create policy "Authenticated users can upload donation screenshots"
on storage.objects for insert
with check (bucket_id = 'donations' and auth.role() = 'authenticated');
