import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PostActions from "@/components/PostActions";
import CommentSection from "@/components/CommentSection";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .eq("id", id)
    .single();

  if (error || !post) {
    return (
      <div className="mx-auto max-w-2xl p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          게시글을 찾을 수 없습니다
        </h1>
        <Link
          href="/posts"
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="mt-2 flex gap-2 text-sm text-gray-500">
        <span>{post.profiles?.username ?? "익명"}</span>
        <span>·</span>
        <span>{new Date(post.created_at).toLocaleDateString("ko-KR")}</span>
      </div>
      <div className="mt-6 whitespace-pre-wrap leading-relaxed text-gray-700">
        {post.content}
      </div>
      <PostActions postId={post.id} postUserId={post.user_id} />
      <CommentSection postId={post.id} />
      <Link
        href="/posts"
        className="mt-4 inline-block text-blue-500 hover:underline"
      >
        ← 목록으로 돌아가기
      </Link>
    </article>
  );
}
