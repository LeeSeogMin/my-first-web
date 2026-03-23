# Chapter 5. Next.js 기초 — B회차: 실습

> **미션**: 블로그 글 목록/상세/작성 페이지를 구현하고 배포한다

---

## 과제 스펙



**블로그 3페이지**를 만든다:

① 목록 페이지 (`/posts`) — 더미 게시글 카드 리스트, 카드 클릭 시 상세 페이지로 이동
② 상세 페이지 (`/posts/[id]`) — 해당 게시글의 제목, 내용, 작성자, 날짜 표시 + 목록으로 돌아가기 링크
③ 작성 페이지 (`/posts/new`) — 제목(input) + 내용(textarea) 폼, 제출 시 alert + 목록으로 이동
④ 공통 레이아웃 — 내비게이션 바에 홈, 블로그, 새 글 쓰기 링크
⑤ Vercel 배포


---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot Chat에 프롬프트를 입력하여 3개의 페이지를 구현한다. 생성된 코드를 그대로 쓰지 말고, A회차에서 배운 기준으로 반드시 검증한다.

### MCP · Skills 초기 설정

이번 실습부터 MCP와 Skills를 설정한다. App Router 라우팅이 본격적으로 시작되므로, AI가 최신 문서를 참조하고 규칙을 자동 점검하도록 한다.

**① Context7 MCP 설치** — Copilot Agent 모드에서 아래 프롬프트를 입력한다:

> **Copilot 프롬프트**
> "이 프로젝트에 .vscode/mcp.json 파일을 생성하고, context7 MCP 서버를 설정해줘.
> command는 npx, args는 ["-y", "@upstash/context7-mcp@latest"]로 설정해줘."


설치 후 테스트: `use context7. Next.js App Router에서 동적 라우트 [id] 폴더와 params 사용법을 알려줘`

**② Skills 생성** — Copilot Agent 모드에서 아래 프롬프트를 입력한다:

> **Copilot 프롬프트**
> "이 프로젝트 루트에 아래 2개 Skill을 생성해줘.
> 1) .github/skills/nextjs-basic-check/SKILL.md — App Router(app/) 구조, Server/Client 컴포넌트 구분, next/navigation 사용 규칙
> 2) .github/skills/api-safety-check/SKILL.md — fetch 호출의 response.ok 체크, try-catch 에러 처리, 사용자 에러 메시지 표시 규칙
> 각 SKILL.md는 한국어 지침 4~6줄로 작성해줘."


### 이번 실습에서 활용할 MCP · Skills

| 도구 | 활용 방법 |
|------|----------|
| **Context7** | App Router 라우팅 문법이 정확한지 최신 문서로 확인한다. 프롬프트 앞에 `use context7`을 붙인다. |
| **nextjs-basic-check** | 목록/상세/작성 페이지를 만든 직후, App Router 경로·`next/navigation` import·`"use client"` 위치를 점검한다. |
| **api-safety-check** | fetch 호출의 에러 처리를 점검한다. |

- Context7 프롬프트 예시: `use context7. Next.js App Router에서 동적 라우트 [id] 폴더와 params 사용법을 알려줘`
- Skills 점검 프롬프트 예시: `nextjs-basic-check 기준으로 라우팅 구조와 import 오류를 점검해줘`

> Supabase MCP와 secret-guard Skill은 Ch8에서 Supabase 프로젝트를 생성한 후 설정한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:
> "블로그 만들어줘"

문제: 몇 개의 페이지인지, 어떤 데이터를 쓰는지, 어떤 라우팅 구조인지 전혀 알려주지 않았다. AI가 Pages Router(구버전)로 만들거나, 하나의 페이지에 모든 기능을 넣을 수 있다.

✅ 좋은 프롬프트:


> "app/posts/page.tsx를 만들어줘. lib/posts.ts에서 posts 배열을 import하고,
> 게시글 목록을 카드 형태로 표시해줘. 각 카드를 클릭하면 /posts/[id]로 이동.
> next/link의 Link 컴포넌트 사용. Tailwind CSS 스타일링.
> Next.js 16 App Router."


---

## 개인 실습

### 체크포인트 1: 목록 페이지 + 더미 데이터

**목표**: 목록 페이지에서 더미 게시글을 카드로 표시하고, 클릭하면 상세 페이지로 이동한다.

① `lib/posts.ts`에 더미 데이터 파일을 만든다 (3개 게시글 — id, title, content, author, date). Copilot에게 요청하거나 직접 작성한다.
② Copilot Chat에 프롬프트를 입력하여 `app/posts/page.tsx` 목록 페이지 코드를 생성한다
③ Copilot이 직접 파일을 수정한다 — 변경된 코드를 확인
④ **Link 사용 확인**: `<a>` 태그가 아닌 `<Link>`를 사용했는지 검사한다
⑤ **key 속성 확인**: `map()` 안에 `key={post.id}`가 있는지 검사한다
⑥ **import 경로 확인**: `lib/posts.ts`에서 올바르게 import했는지 검사한다


### 체크포인트 2: 상세 + 작성 페이지

**목표**: 상세 페이지와 작성 페이지를 구현한다.

**상세 페이지**:


> "app/posts/[id]/page.tsx를 만들어줘. Next.js 16 App Router이므로 params를 await해서 id를 추출해줘. lib/posts.ts에서 해당 id의 게시글을 find로 찾아 표시. 없으면 '게시글을 찾을 수 없습니다' 메시지 표시. 목록으로 돌아가기 Link 포함. Tailwind CSS 사용."

① 생성된 코드에서 `const { id } = await params` 패턴을 사용했는지 확인한다
② `find()`로 해당 id의 게시글을 찾는지 확인한다
③ 게시글이 없을 때 안내 메시지가 표시되는지 확인한다
④ 목록으로 돌아가는 Link가 있는지 확인한다

**작성 페이지**:


> "app/posts/new/page.tsx를 만들어줘. 제목(input)과 내용(textarea) 입력 폼. 아직 백엔드가 없으므로 제출 시 alert('저장되었습니다')만 표시하고 /posts로 이동. useRouter 사용. 'use client' 필수. Next.js 16 App Router, Tailwind CSS."

④ `"use client"` 지시어가 있는지 확인한다
⑤ `useRouter`를 `next/navigation`에서 import했는지 확인한다

**레이아웃 업데이트**:

⑥ `app/layout.tsx`의 내비게이션 바에 홈(`/`), 블로그(`/posts`), 새 글 쓰기(`/posts/new`) 링크를 추가한다


### 체크포인트 3: 검증 + 배포

**목표**: AI 코드를 검증하고 배포한다.

① 아래 검증 체크리스트를 수행한다
② 문제가 있으면 수정한다
③ 전체 흐름 테스트: `/posts` 목록 → 카드 클릭 → `/posts/1` 상세 → 목록으로 돌아가기 → `/posts/new` 작성 → 제출 → 목록으로 이동
④ Copilot Chat(Agent 모드)에 배포 요청:

> **Copilot 프롬프트**
>
> "터미널에서 git add, commit, push를 실행해줘."
⑤ Vercel 대시보드에서 배포 완료를 확인한다
⑥ 배포된 URL에서 3페이지 모두 동작하는지 확인한다

---


## 흔한 AI 실수

**표 5.9** Ch5에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 방법 | 발생 원인 |
|---------|------------|----------|
| `import { useRouter } from "next/router"` | `from "next/navigation"` | Pages Router 학습 데이터 |
| `const { id } = params` | `const { id } = await params` | 교재 고정 버전(Next.js 16.2.1)과 불일치 |
| `<a href="/posts">` 내부 링크 | `<Link href="/posts">` | HTML 기본 태그로 대체 |
| `class="btn"` in JSX | `className="btn"` | HTML과 JSX 혼동 |
| `pages/` 폴더 구조 | `app/` 폴더 구조 | Pages Router(구버전) 패턴 |
| `getServerSideProps` 사용 | Server Component에서 직접 fetch | Pages Router 데이터 페칭 |
| `"use client"` 누락 | useRouter 사용 시 필수 | Server Component 기본 미인지 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch5 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 useRouter를 next/router에서 import했는데,
       next/navigation으로 수정했다."
```

---
