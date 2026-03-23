import Link from "next/link";
import { posts } from "@/lib/posts";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          게시글을 찾을 수 없습니다
        </h1>
        <Link href="/posts" className="mt-4 inline-block text-blue-500 hover:underline">
          ← 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="mt-2 flex gap-2 text-sm text-gray-500">
        <span>{post.author}</span>
        <span>·</span>
        <span>{post.date}</span>
      </div>
      <div className="mt-6 leading-relaxed text-gray-700">{post.content}</div>
      <Link
        href="/posts"
        className="mt-8 inline-block text-blue-500 hover:underline"
      >
        ← 목록으로 돌아가기
      </Link>
    </article>
  );
}
