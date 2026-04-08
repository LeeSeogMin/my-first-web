export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

export const posts: Post[] = [
  {
    id: 1,
    title: '첫 번째 게시글',
    content: '이것은 더미 데이터로 작성된 첫 번째 게시글의 내용입니다.',
    author: '김철수',
    date: '2026-04-01',
  },
  {
    id: 2,
    title: '두 번째 게시글',
    content: '여기는 두 번째 게시글의 샘플 내용이 들어갑니다.',
    author: '이영희',
    date: '2026-03-28',
  },
  {
    id: 3,
    title: '세 번째 게시글',
    content: '더미 데이터용 세 번째 게시글입니다. 테스트용으로 사용하세요.',
    author: '박민수',
    date: '2026-02-14',
  },
];
