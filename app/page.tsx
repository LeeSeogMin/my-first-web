type Post = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
};

const posts: Post[] = [
  {
    id: 1,
    title: "React 19 핵심 기능 정리",
    excerpt:
      "React 19에서 달라진 주요 기능과 실무에서 바로 보이는 변화를 간단히 정리했습니다.",
    author: "김코딩",
    date: "2026-03-30",
  },
  {
    id: 2,
    title: "Next.js App Router 첫 화면 만들기",
    excerpt:
      "App Router 구조를 기준으로 메인 페이지를 구성하는 기본 흐름을 살펴봅니다.",
    author: "김코딩",
    date: "2026-03-29",
  },
  {
    id: 3,
    title: "Tailwind CSS로 카드 UI 만들기",
    excerpt:
      "Tailwind 유틸리티 클래스로 카드 레이아웃과 여백, 타이포그래피를 빠르게 적용합니다.",
    author: "김코딩",
    date: "2026-03-28",
  },
];

const navItems = [
  { label: "홈", href: "#" },
  { label: "게시글", href: "#" },
  { label: "소개", href: "#" },
] as const;

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 md:px-6">
      <header className="border-b border-[#e7d8c8] pb-5">
        <nav className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b6b4e]">
              My Blog
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#2f241b]">
              나의 기술 블로그
            </h1>
          </div>
          <ul className="flex gap-5 text-sm font-medium text-[#5c4a3b]">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="transition hover:text-[#8b6b4e]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1 py-8">
        <section aria-labelledby="latest-posts">
          <h2
            id="latest-posts"
            className="mb-6 text-2xl font-bold text-[#2f241b]"
          >
            최신 게시글
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
              >
                <h3 className="mb-3 text-lg font-bold text-[#2f241b]">
                  {post.title}
                </h3>
                <p className="mb-5 text-gray-600">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e7d8c8] pt-4 text-center text-sm text-gray-400">
        <p>&copy; 2026 나의 기술 블로그</p>
      </footer>
    </div>
  );
}
