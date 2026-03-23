"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { createPost } from "@/lib/posts";

export default function NewPostPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <p className="p-6 text-center text-gray-500">로딩 중...</p>;

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl p-6 text-center">
        <p className="text-gray-600">로그인이 필요합니다</p>
        <a href="/login" className="mt-2 inline-block text-blue-500 hover:underline">
          로그인 하기
        </a>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || title.trim().length < 2) {
      setError("제목은 2자 이상 입력해주세요");
      return;
    }
    if (title.length > 100) {
      setError("제목은 100자 이하로 입력해주세요");
      return;
    }
    if (!content.trim() || content.trim().length < 10) {
      setError("내용은 10자 이상 입력해주세요");
      return;
    }
    setError(null);
    setSubmitting(true);

    const { error: insertError } = await createPost(user!.id, title, content);

    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }

    router.push("/posts");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">새 글 쓰기</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border px-3 py-2 text-lg"
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full rounded border px-3 py-2"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {submitting ? "저장 중..." : "작성하기"}
        </button>
      </form>
    </div>
  );
}
