import { supabase } from "@/services/supabase";
import { User } from "@supabase/supabase-js";
import { Tables } from "@/types/supabase.types";

export type UserMetadata = Omit<Tables<"user_metadata">, "id">;

/* Adds collectionId and role fields to user */
export async function setUserMetadata(user: User): Promise<void> {
  const metadata = await getOrCreateUserMetadata(user);

  user.user_metadata = {
    ...user.user_metadata,
    ...metadata,
  };
  console.log("metadata", metadata);
}

/*
Checks for user_metadata record.
If it doesn't exist, then creates user_metadata, new collectionId and binds them.
Used for new users mostly.
*/
export async function getOrCreateUserMetadata(
  user: User,
): Promise<UserMetadata> {
  const DEFAULT_USER_METADATA: UserMetadata = {
    role: "user",
    collectionId: null,
  };

  // Check if user exists
  const userRecords = await supabase
    .from("user_metadata")
    .select()
    .eq("id", user.id);

  if (!userRecords.data) {
    return DEFAULT_USER_METADATA;
  }

  // If user metadata exists, return it
  if (userRecords.data.length > 0) {
    return userRecords.data[0];
  }

  // Otherwise create user_metadata record
  const userRecord = await supabase
    .from("user_metadata")
    .insert({
      id: user.id,
      role: "user",
    })
    .select(`collectionId, role`)
    .single();

  // create a collection for user
  const collectionRecord = await supabase
    .from("collections")
    .insert({ name: `${user.email} collection`, userId: user.id })
    .eq("name", "default")
    .select("id")
    .single();

  // assign collection to a user
  await supabase
    .from("user_metadata")
    .update({
      collectionId: collectionRecord.data?.id,
    })
    .eq("id", user.id);

  return userRecord.data ?? DEFAULT_USER_METADATA;
}
