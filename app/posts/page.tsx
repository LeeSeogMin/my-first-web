import Link from "next/link";
import { posts } from "@/lib/posts";
import PostList from "@/components/PostList";

export default function PostsPage() {
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
      <PostList initialPosts={posts} />
    </div>
  );
}
