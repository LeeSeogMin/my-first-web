# Architecture — 민준의 블로그

## Goals
- 개인 블로그: 글 작성/조회/수정/삭제 + 로그인 후 글 관리
- 깔끔한 읽기 경험, 편리한 작성/관리

## Non-goals
- 소셜 로그인 (이메일/비밀번호만)
- 실시간 채팅, 알림

## Tech Stack
- Next.js 16.2.1 (App Router)
- React 19.2.4
- Tailwind CSS 4 + shadcn/ui
- Supabase (Auth + Database + RLS)
- Vercel (배포)

## Page Map (App Router)

| 경로 | 설명 | 컴포넌트 유형 |
|------|------|--------------|
| `/` | 홈 (최신 게시글 목록) | Server |
| `/posts` | 게시글 목록 + 검색 | Server + Client(SearchBar) |
| `/posts/new` | 게시글 작성 | Client |
| `/posts/[id]` | 게시글 상세 | Server |
| `/posts/[id]/edit` | 게시글 수정 | Client |
| `/login` | 로그인 | Client |
| `/signup` | 회원가입 | Client |
| `/mypage` | 마이페이지 | Client |

## Component Hierarchy

```
RootLayout (layout.tsx)
├── Header (nav: 홈, 블로그, 새 글 쓰기, 로그인/로그아웃)
├── {children} — 페이지별 콘텐츠
└── Footer
```

## Data Model (Ch8 Supabase 대비)

```
profiles
├── id: uuid (PK, auth.users 참조)
├── username: text
├── avatar_url: text
└── created_at: timestamptz

posts
├── id: uuid (PK)
├── user_id: uuid (FK → profiles.id)
├── title: text
├── content: text
└── created_at: timestamptz
```

## Design Tokens
- Primary: #8B6B4E
- Background: #FBF8F3
- Text: #3A2E26
- Border: #E8DDD0
