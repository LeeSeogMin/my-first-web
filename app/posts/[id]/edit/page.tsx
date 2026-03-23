"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getPost, updatePost } from "@/lib/posts";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await getPost(id);
      if (error || !data) {
        setError("게시글을 찾을 수 없습니다");
        setLoading(false);
        return;
      }
      if (user && data.user_id !== user.id) {
        setError("수정 권한이 없습니다");
        setLoading(false);
        return;
      }
      setTitle(data.title);
      setContent(data.content ?? "");
      setLoading(false);
    }
    if (user) load();
  }, [id, user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("제목을 입력해주세요");
      return;
    }
    setSubmitting(true);
    const { error: updateError } = await updatePost(id, title, content);
    if (updateError) {
      setError(updateError.message);
      setSubmitting(false);
      return;
    }
    router.push(`/posts/${id}`);
    router.refresh();
  }

  if (loading) return <p className="p-6 text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">글 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border px-3 py-2 text-lg"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full rounded border px-3 py-2"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {submitting ? "저장 중..." : "수정하기"}
        </button>
      </form>
    </div>
  );
}
