create policy "Enable read access for all users"
on "public"."ingredients"
as permissive
for select
to authenticated
using (true);



