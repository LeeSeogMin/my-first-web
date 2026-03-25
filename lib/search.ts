import { createClient } from "@/lib/supabase/client";

export async function searchPosts(query: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
    .order("created_at", { ascending: false });
  return { data, error };
}
