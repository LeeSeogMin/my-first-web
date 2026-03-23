"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          민준의 블로그
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-600 hover:text-blue-500">
            홈
          </Link>
          <Link href="/posts" className="text-gray-600 hover:text-blue-500">
            블로그
          </Link>
          <Link href="/search" className="text-gray-600 hover:text-blue-500">
            검색
          </Link>
          <Link
            href="/posts/new"
            className="text-gray-600 hover:text-blue-500"
          >
            새 글 쓰기
          </Link>
          {loading ? null : user ? (
            <button
              onClick={handleSignOut}
              className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
            >
              로그아웃
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
            >
              로그인
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
