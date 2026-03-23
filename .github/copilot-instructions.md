# Copilot Instructions

## Tech Stack
- Next.js 16.2.1 (App Router ONLY)
- React 19.2.4
- Tailwind CSS 4 (@tailwindcss/postcss)
- TypeScript 5
- shadcn/ui (components/ui/)
- Supabase (@supabase/ssr + @supabase/supabase-js) — Ch8부터

## Coding Conventions
- Server Component 기본, 필요할 때만 "use client"
- Tailwind CSS 유틸리티 클래스만 사용 (별도 CSS 파일 금지)
- async/await 패턴 (then 체이닝 금지)
- const 기본, 필요 시 let (var 금지)
- 함수 선언 방식 (`export default function` — Next.js 공식 스타일)

## Design Tokens
- Primary: #8B6B4E
- Background: #FBF8F3
- Text: #3A2E26
- Border: #E8DDD0
- 톤: 깔끔함 / 가독성 / 여백
- 금지: 네온 컬러, 과한 그라디언트, 과한 그림자

## Component Rules
- shadcn/ui 컴포넌트 우선 사용 (Button, Card, Input 등)
- 커스텀 컴포넌트는 components/ 폴더에 배치
- UI 컴포넌트는 components/ui/ (shadcn/ui 관리)

## File Structure
- app/ — 페이지 (App Router)
- components/ — 재사용 컴포넌트
- lib/ — 유틸리티, Supabase 클라이언트, 데이터 함수
- contexts/ — React Context (AuthContext 등)

## Known AI Mistakes
- `next/router` 금지 → `next/navigation` 사용
- Pages Router 금지 → App Router(app/) 사용
- `class` 금지 → `className` 사용
- `for` 금지 → `htmlFor` 사용
- params는 Promise → `const { id } = await params`
- Tailwind CSS 3 문법 금지 → Tailwind CSS 4 (@theme 블록) 사용
