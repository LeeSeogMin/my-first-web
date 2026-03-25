"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { deletePost } from "@/lib/posts";

interface PostActionsProps {
  postId: string;
  postUserId: string;
}

export default function PostActions({ postId, postUserId }: PostActionsProps) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || user.id !== postUserId) return null;

  async function handleDelete() {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await deletePost(postId);
    if (error) {
      alert("삭제에 실패했습니다: " + error.message);
      return;
    }
    router.push("/posts");
    router.refresh();
  }

  return (
    <div className="mt-6 flex gap-2">
      <Link
        href={`/posts/${postId}/edit`}
        className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
      >
        수정
      </Link>
      <button
        onClick={handleDelete}
        className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
      >
        삭제
      </button>
    </div>
  );
}
