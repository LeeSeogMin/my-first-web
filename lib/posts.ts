import { createClient } from "@/lib/supabase/client";

export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  created_at: string;
  profiles?: { username: string | null };
}

// 목록 조회 (최신순, 작성자 포함)
export async function getPosts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .order("created_at", { ascending: false });
  return { data, error };
}

// 단건 조회
export async function getPost(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .eq("id", id)
    .single();
  return { data, error };
}

// 생성
export async function createPost(
  user_id: string,
  title: string,
  content: string
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .insert({ user_id, title, content })
    .select();
  return { data, error };
}

// 수정
export async function updatePost(
  id: string,
  title: string,
  content: string
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .update({ title, content })
    .eq("id", id)
    .select();
  return { data, error };
}

// 삭제
export async function deletePost(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);
  return { data, error };
}
