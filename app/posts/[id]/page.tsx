import Link from 'next/link';
import { posts } from '../../../lib/posts';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-xl w-full bg-white rounded-md shadow-md p-6 text-center">
          <h1 className="text-2xl font-semibold mb-4">게시글을 찾을 수 없습니다</h1>
          <p className="text-sm text-gray-600 mb-6">요청하신 ID의 게시글이 존재하지 않습니다.</p>
          <Link href="/posts" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">목록으로 돌아가기</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-md shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-6">{post.author} · {post.date}</div>
        <article className="prose prose-lg mb-6">
          <p>{post.content}</p>
        </article>
        <Link href="/posts" className="text-sm text-blue-600 hover:underline">← 목록으로 돌아가기</Link>
      </div>
    </main>
  );
}
