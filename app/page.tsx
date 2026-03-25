export default function Home() {
  const posts = [
    {
      id: "1",
      title: "첫 번째 게시물",
      date: "2026-03-25",
      excerpt: "이 글은 예시 게시물입니다. 블로그 형식의 홈을 보여줍니다.",
    },
    {
      id: "2",
      title: "두 번째 게시물",
      date: "2026-03-20",
      excerpt: "다른 예시 글입니다. 각 게시물 카드에는 제목, 날짜, 요약이 있습니다.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">이석민의 블로그</h1>
          <p className="mt-1 text-gray-600">공공인재 · 관심사: 잠자기 · 개인 기록 보관소</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-900">소개</h2>
            <p className="mt-3 text-gray-700">안녕하세요, 이석민입니다. 이 블로그는 개인 기록과 생각을 정리하는 공간입니다.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">최근 게시물</h3>
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow p-6">
                <h4 className="text-2xl font-semibold text-gray-900">{post.title}</h4>
                <div className="text-sm text-gray-500 mt-1">{post.date}</div>
                <p className="mt-3 text-gray-700">{post.excerpt}</p>
                <a className="mt-4 inline-block text-blue-600 hover:underline" href="#">
                  자세히 보기 →
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
