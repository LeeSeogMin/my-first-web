import Link from "next/link";
import { posts } from "@/lib/posts";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <h2 className="mb-6 text-2xl font-bold">최신 게시글</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <article className="rounded-lg bg-white p-6 shadow transition hover:shadow-lg">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="mt-2 text-gray-600 line-clamp-2">
                {post.content}
              </p>
              <div className="mt-4 flex justify-between text-sm text-gray-400">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
