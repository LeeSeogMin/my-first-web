"use client";

import { useState } from "react";
import Link from "next/link";
import { searchPosts } from "@/lib/search";

interface Post {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
  profiles?: { username: string | null };
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const { data } = await searchPosts(query);
    setResults((data as Post[]) ?? []);
    setSearched(true);
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">검색</h1>
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="제목 또는 내용으로 검색..."
          className="flex-1 rounded border px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "검색 중..." : "검색"}
        </button>
      </form>

      {searched && results.length === 0 && (
        <p className="text-center text-gray-500">검색 결과가 없습니다</p>
      )}

      <div className="space-y-4">
        {results.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <article className="rounded-lg bg-white p-6 shadow transition hover:shadow-lg">
              <h2 className="text-lg font-bold">{post.title}</h2>
              <p className="mt-2 text-gray-600 line-clamp-2">{post.content}</p>
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
    </div>
  );
}
