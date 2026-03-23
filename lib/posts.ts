export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

export const posts: Post[] = [
  {
    id: 1,
    title: "Next.js로 블로그 만들기",
    content:
      "create-next-app으로 프로젝트를 생성하고 Vercel에 배포하는 과정을 정리했습니다. App Router를 사용하면 폴더 구조가 곧 URL 구조가 되어 직관적입니다.",
    author: "김민준",
    date: "2026-03-20",
  },
  {
    id: 2,
    title: "Tailwind CSS 핵심 정리",
    content:
      "유틸리티 퍼스트 CSS의 장점과 자주 쓰는 클래스를 정리했습니다. p-4, text-lg, bg-blue-500 같은 클래스만 알면 대부분의 스타일링이 가능합니다.",
    author: "김민준",
    date: "2026-03-18",
  },
  {
    id: 3,
    title: "AI 바이브코딩 후기",
    content:
      "Copilot과 함께 코딩하면서 느낀 점을 공유합니다. AI가 생성한 코드를 반드시 검증해야 하며, 좋은 프롬프트가 좋은 코드를 만듭니다.",
    author: "김민준",
    date: "2026-03-15",
  },
];
