create extension if not exists "pg_cron" with schema "extensions";


set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  new_collection_id bigint;
begin
  insert into public.collections (name, "userId")
  values ('Collection for user ' || new.email, new.id)
  returning id into new_collection_id;

  insert into public.user_metadata (id, email, "collectionId")
  values (new.id, new.email, new_collection_id);

  return new;
end;
$function$
;


