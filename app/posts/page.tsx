import Link from 'next/link';
import { posts } from '../../lib/posts';

export default function PostsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">게시글</h1>

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block border rounded-lg p-6 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-3">
              {post.content.length > 120 ? post.content.slice(0, 120) + '…' : post.content}
            </p>
            <div className="text-sm text-gray-500">{post.author} · {post.date}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
