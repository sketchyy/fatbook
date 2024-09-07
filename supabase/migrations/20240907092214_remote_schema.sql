drop policy "Enable access for authenticated users only" on "public"."ingredients";

create policy "User can do ALL with ingredients only from their COLLECTION"
on "public"."ingredients"
as permissive
for all
to authenticated
using (("parentDishId" IN ( SELECT d.id
   FROM dishes d,
    collections c
  WHERE ((d."collectionId" = c.id) AND (c."userId" = ( SELECT auth.uid() AS uid))))));



