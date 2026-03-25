import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function PostsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">블로그 글 목록</h1>
        <Link
          href="/posts/new"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          새 글 쓰기
        </Link>
      </div>
      {!posts || posts.length === 0 ? (
        <p className="text-center text-gray-500">게시글이 없습니다</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <article className="rounded-lg bg-white p-6 shadow transition hover:shadow-lg">
                <h2 className="text-lg font-bold">{post.title}</h2>
                <p className="mt-2 text-gray-600 line-clamp-2">
                  {post.content}
                </p>
                <div className="mt-4 flex justify-between text-sm text-gray-400">
                  <span>{post.profiles?.username ?? "익명"}</span>
                  <span>
                    {new Date(post.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
