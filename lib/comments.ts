import { createClient } from "@/lib/supabase/client";

export async function getComments(postId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*, profiles(username)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });
  return { data, error };
}

export async function createComment(
  postId: string,
  userId: string,
  content: string
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments")
    .insert({ post_id: postId, user_id: userId, content })
    .select("*, profiles(username)");
  return { data, error };
}

export async function deleteComment(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("comments").delete().eq("id", id);
  return { error };
}
