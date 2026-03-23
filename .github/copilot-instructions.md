# Copilot Instructions

## Tech Stack
- Next.js 16.2.1 (App Router ONLY)
- React 19.2.4
- Tailwind CSS 4 (@tailwindcss/postcss)
- TypeScript 5

## Coding Conventions
- Server Component 기본, 필요할 때만 "use client"
- Tailwind CSS 유틸리티 클래스만 사용 (별도 CSS 파일 금지)
- async/await 패턴 (then 체이닝 금지)
- const 기본, 필요 시 let (var 금지)

## Known AI Mistakes
- `next/router` 금지 → `next/navigation` 사용
- Pages Router 금지 → App Router(app/) 사용
- `class` 금지 → `className` 사용
- `for` 금지 → `htmlFor` 사용
- params는 Promise → `const { id } = await params`
