"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getComments, createComment, deleteComment } from "@/lib/comments";

interface Comment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: { username: string | null };
}

export default function CommentSection({ postId }: { postId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await getComments(postId);
      setComments((data as Comment[]) ?? []);
      setLoading(false);
    }
    load();
  }, [postId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    const { data } = await createComment(postId, user.id, newComment);
    if (data && data.length > 0) {
      setComments([...comments, data[0] as Comment]);
      setNewComment("");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    const { error } = await deleteComment(id);
    if (!error) {
      setComments(comments.filter((c) => c.id !== id));
    }
  }

  if (loading) return <p className="text-sm text-gray-400">댓글 로딩 중...</p>;

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="mb-4 text-lg font-bold">댓글 ({comments.length})</h3>

      {comments.map((comment) => (
        <div key={comment.id} className="mb-3 rounded bg-gray-50 p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {comment.profiles?.username ?? "익명"}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">
                {new Date(comment.created_at).toLocaleDateString("ko-KR")}
              </span>
              {user?.id === comment.user_id && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  삭제
                </button>
              )}
            </div>
          </div>
          <p className="mt-1 text-gray-700">{comment.content}</p>
        </div>
      ))}

      {user ? (
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="flex-1 rounded border px-3 py-2"
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            등록
          </button>
        </form>
      ) : (
        <p className="mt-4 text-sm text-gray-400">
          댓글을 작성하려면 로그인하세요
        </p>
      )}
    </div>
  );
}
