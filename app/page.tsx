import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h2 className="mb-6 text-2xl font-bold">최신 게시글</h2>
      {!posts || posts.length === 0 ? (
        <p className="text-center text-gray-500">
          아직 게시글이 없습니다.{" "}
          <Link href="/posts/new" className="text-blue-500 hover:underline">
            첫 글을 작성해보세요!
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <article className="rounded-lg bg-white p-6 shadow transition hover:shadow-lg">
                <h3 className="text-lg font-bold">{post.title}</h3>
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
