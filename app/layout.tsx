import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "민준의 블로그",
  description: "Next.js + Tailwind CSS로 만든 개인 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="bg-white shadow">
          <nav className="mx-auto flex max-w-4xl items-center justify-between p-4">
            <Link href="/" className="text-xl font-bold">
              민준의 블로그
            </Link>
            <div className="flex gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-500"
              >
                홈
              </Link>
              <Link
                href="/posts"
                className="text-gray-600 hover:text-blue-500"
              >
                블로그
              </Link>
              <Link
                href="/posts/new"
                className="text-gray-600 hover:text-blue-500"
              >
                새 글 쓰기
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t bg-white py-6 text-center text-sm text-gray-400">
          &copy; 2026 김민준. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
