"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import type { Post } from "@/lib/posts";

interface PostListProps {
  initialPosts: Post[];
}

export default function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) =>
    searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  function handleDelete(id: number) {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setPosts(posts.filter((p) => p.id !== id));
  }

  return (
    <>
      <SearchBar onSearch={setSearchQuery} />

      {filteredPosts.length === 0 && (
        <p className="text-center text-gray-500">검색 결과가 없습니다</p>
      )}

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
          >
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-lg font-bold hover:text-blue-500">
                {post.title}
              </h2>
            </Link>
            <p className="mt-2 text-gray-600 line-clamp-2">{post.content}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
              <div>
                <span>{post.author}</span>
                <span className="mx-2">·</span>
                <span>{post.date}</span>
              </div>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-400 hover:text-red-600"
              >
                삭제
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
