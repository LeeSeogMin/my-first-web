# GitHub Copilot — Repository 지침

## Tech Stack

- Next.js: 16.2.1 (App Router ONLY)
- Tailwind CSS: ^4

## Coding Conventions

- 기본: Server Component를 기본으로 사용합니다 (App Router 환경).
- 클라이언트 동작이 필요한 컴포넌트는 `use client`를 명시합니다.
- 스타일은 Tailwind CSS만 사용합니다. 다른 CSS-in-JS 또는 전역 CSS 사용을 지양하세요.

## Known AI Mistakes / 금지 사항

- `next/router` 사용 금지 — `next/navigation`을 사용하세요.
- Pages Router 사용 금지 — App Router만 사용합니다.
- `params` 관련 작업은 비동기 처리가 필요한 경우 반드시 `await`를 사용하세요.

---
이 파일은 레포지토리 내부의 AI 보조 도구(Copilot 등)가 이 저장소의 규칙을 따르도록 돕기 위한 지침입니다.
