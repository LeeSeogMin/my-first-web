import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <nav className="bg-gray-800 text-white p-4 flex items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-lg hover:text-gray-300">내 블로그</Link>
            <Link href="/posts" className="hover:text-gray-300">게시글</Link>
          </div>

          <div className="ml-auto">
            <Link href="/posts/new" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-sm">새 글 쓰기</Link>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto p-6">{children}</main>

        <footer className="text-center text-gray-500 py-4">© 2026 내 블로그</footer>
      </body>
    </html>
  );
}

