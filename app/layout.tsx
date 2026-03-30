import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "나의 기술 블로그",
  description: "Ch2에서 만드는 블로그 소개 페이지입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

