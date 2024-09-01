drop policy "Enable access for authenticated users only" on "public"."dishes";

create policy "User can CRUD dishes only from their collection"
on "public"."dishes"
as permissive
for all
to authenticated
using (("collectionId" IN ( SELECT u."collectionId"
   FROM user_metadata u
  WHERE (u.id = ( SELECT auth.uid() AS uid)))));


create policy "Users can get shared collection dishes"
on "public"."dishes"
as permissive
for select
to public
using (("collectionId" = 1));



