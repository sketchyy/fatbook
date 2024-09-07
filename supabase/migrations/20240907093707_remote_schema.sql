drop policy "User can do ALL with ingredients only from their COLLECTION" on "public"."ingredients";

create policy "User can do ALL with ingredients only from their COLLECTION"
on "public"."ingredients"
as permissive
for all
to authenticated
using (("parentDishId" IN ( SELECT d.id
   FROM dishes d,
    user_metadata um
  WHERE ((um.id = ( SELECT auth.uid() AS uid)) AND (um."collectionId" = d."collectionId")))));



