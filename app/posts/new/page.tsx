"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PostForm {
  title: string;
  content: string;
}

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState<PostForm>({ title: "", content: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("제목을 입력해주세요");
      return;
    }
    alert("저장되었습니다");
    router.push("/posts");
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">새 글 쓰기</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-lg"
        />
        <textarea
          name="content"
          placeholder="내용을 입력하세요"
          value={form.content}
          onChange={handleChange}
          rows={10}
          className="w-full rounded border px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
        >
          작성하기
        </button>
      </form>
    </div>
  );
}
