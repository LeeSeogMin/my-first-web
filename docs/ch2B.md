# Chapter 2. Copilot 세팅과 바이브코딩 — B회차: 실습

> **미션**: Copilot으로 블로그 소개 페이지를 만들고 배포한다

---

## 과제 스펙

**오늘 만들 것**:

1. `.github/copilot-instructions.md` — Copilot에게 프로젝트 규칙 알려주기
2. `app/page.tsx` — 블로그 소개 페이지 (이름, 학교, 전공, 취미)
3. Vercel 배포 + AI 사용 로그

Ch1에서 만든 프로젝트를 이어서 사용한다.

---

## 바이브코딩 가이드

> **핵심**: 직접 타이핑하지 말고, Copilot에게 시킨다 → 생성된 코드를 검증한다 → 틀린 부분을 수정 지시한다

### 좋은 프롬프트 작성법

❌ **나쁜 프롬프트**:

> "블로그 소개 페이지 만들어줘"

→ 기술 스택, 파일 위치가 없다. AI가 임의로 판단한다.

✅ **좋은 프롬프트**:

> "app/page.tsx에 블로그 소개 페이지를 만들어줘.
> Tailwind CSS로 중앙에 흰색 카드(rounded-lg shadow)를 배치하고,
> 이름(text-3xl font-bold), 학교, 전공, 취미를 표시해줘."

→ 파일 위치, 기술 스택, 구체적 요구사항이 명확하다.

---

### AI 도구별 프롬프트 팁

이 교재의 프롬프트는 GitHub Copilot Agent 모드를 기준으로 작성되어 있다. 다른 AI 도구를 사용할 때는 다음 사항을 참고한다.

**표 2.8** AI 도구별 컨텍스트 전달 방법

| 항목 | GitHub Copilot (Agent 모드) | Antigravity | Claude Code |
|------|---------------------------|------------|-------------|
| 파일 참조 | `#file:app/page.tsx` | `@file` 또는 자동 인식 | `@파일명` 또는 자동 인식 |
| 터미널 실행 | Agent 모드에서 자동 실행 | Agent Panel에서 자동 실행 | 자동 실행 |
| 프로젝트 규칙 | `.github/copilot-instructions.md` | `GEMINI.md` 또는 `AGENTS.md` | `CLAUDE.md` |
| 버전 명시 | copilot-instructions.md에 기록 | GEMINI.md에 기록 | CLAUDE.md에 기록 |
| MCP 사용 | `.vscode/mcp.json` 설정 | MCP 내장 지원 (`@멘션`) | `.mcp.json` 또는 내장 |

> **Antigravity 사용자**: `GEMINI.md` 또는 `AGENTS.md`에 규칙을 기록하면 자동으로 인식된다.
> **Claude Code 사용자**: `CLAUDE.md`에 규칙을 기록하면 자동으로 인식된다.

---

## 개인 실습

### 체크포인트 1: copilot-instructions.md 만들기

**목표**: Copilot에게 프로젝트 규칙을 알려준다.

① Copilot Chat을 열고 다음 프롬프트 입력:

> **Copilot 프롬프트**
>
> ".github/copilot-instructions.md 파일을 만들어줘.
>
> 내용:
>
> - Tech Stack: package.json에서 확인한 Next.js, Tailwind CSS 버전 명시 (App Router ONLY)
> - Coding Conventions: Server Component 기본, Tailwind CSS만 사용
> - Known AI Mistakes: next/router 금지(next/navigation 사용), Pages Router 금지"

② 생성된 파일을 열어 버전 확인:

- `package.json`을 열어 실제 버전과 일치하는지 확인
- 틀렸으면 Copilot에게 수정 요청

③ 저장 (`Cmd+S`)

### 체크포인트 2: 블로그 소개 페이지 만들기

**목표**: Copilot으로 소개 페이지를 만들고 검증한다.

① Copilot Chat을 **Agent 모드**로 전환 후 프롬프트 입력:

> **Copilot 프롬프트**
>
> "app/page.tsx를 블로그 소개 페이지로 수정해줘.
> Tailwind CSS로 중앙에 흰색 카드(rounded-lg shadow)를 배치하고,
> 이름(text-3xl font-bold), 학교, 전공, 취미를 표시해줘."

② Copilot이 직접 파일을 수정한다 — 변경된 코드를 확인

③ **검증** (핵심!):

- `className`으로 되어 있는가? (`class` 아님)
- 불필요한 `"use client"`가 있는가? → 제거
- import 경로가 `next/navigation`인가? (`next/router` 아님)

④ 본인 정보로 수정

⑤ 개발 서버로 확인: `npm run dev` → http://localhost:3000

### 체크포인트 3: 배포 + AI 사용 로그

**목표**: Copilot으로 AI 사용 로그 파일을 만들고 배포한다.

① Copilot Chat(Agent 모드)에 프롬프트 입력:

> **Copilot 프롬프트**
>
> "ai-log.md 파일을 만들어줘.
> 내용: 오늘 사용한 프롬프트, AI가 틀린 부분, 해결 방법을 아래 형식으로 작성해줘.
>
> [프롬프트] app/page.tsx를 블로그 소개 페이지로 수정해달라고 요청
> [AI 실수] (실제로 발견한 실수를 여기에)
> [해결] (어떻게 고쳤는지)"

② 실제 발견한 AI 실수로 내용을 수정한다

③ 배포:

> **Copilot 프롬프트**
>
> "터미널에서 git add, commit, push를 실행해줘.
> 커밋 메시지: 'Ch2: 블로그 소개 페이지'"

④ Vercel 배포 완료 후 URL 확인

---

## AI 검증 핵심 3가지

AI가 생성한 코드에서 **반드시** 확인할 것:

| 확인 항목                    | 올바른 예시              | 틀린 예시             |
| ---------------------------- | ------------------------ | --------------------- |
| **1. JSX 문법**              | `className="..."`        | `class="..."`         |
| **2. import 경로**           | `from 'next/navigation'` | `from 'next/router'`  |
| **3. 불필요한 "use client"** | Server Component는 제거  | 모든 파일에 자동 추가 |

---

## 흔한 AI 실수

**Ch2에서 자주 틀리는 패턴**:

- `"use client"`를 모든 파일에 넣는다 → Server Component로 충분하면 제거
- `class="..."`를 쓴다 → JSX에서는 `className` 사용
- `next/router`를 import 한다 → App Router에서는 `next/navigation` 사용
- 존재하지 않는 패키지를 추천한다 → npmjs.com에서 확인 후 설치

---

## 제출 안내 (Google Classroom)

아래 두 항목만 제출:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "'use client'를 불필요하게 추가해서 제거했다"
   또는 "className이 올바르게 사용되었고 검증 완료"
```

---
