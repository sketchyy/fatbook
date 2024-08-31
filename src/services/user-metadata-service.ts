import { supabase } from "@/services/supabase";
import { User } from "@supabase/supabase-js";
import { Tables } from "@/types/supabase.types";

export type UserMetadata = Omit<Tables<"user_metadata">, "id">;

/* Adds collectionId and role fields to user */
export async function setUserMetadata(user: User): Promise<void> {
  const metadata = await getUserMetadata(user);

  user.user_metadata = {
    ...user.user_metadata,
    ...metadata,
  };
  console.log("metadata", metadata);
}

export async function getUserMetadata(user: User): Promise<UserMetadata> {
  const userRecords = await supabase
    .from("user_metadata")
    .select()
    .eq("id", user.id);

  if (!userRecords.data || userRecords.data.length === 0) {
    throw new Error("Error reading user data. Please try log in again.");
  }

  return userRecords.data[0];
}
