# Chapter 13. 블로그 확장 기능 구현 — B회차: 실습

> **미션**: 블로그에 확장 기능(댓글, 태그, 검색)을 구현하고 Vercel에 배포한다

---

## 과제 스펙

Ch12까지 완성한 블로그에 확장 기능을 추가하고 배포한다:

① ARCHITECTURE.md 최신화 (확장 테이블 + RLS 추가)
② 댓글 기능 구현 (comments 테이블 + RLS + CRUD + UI)
③ 태그/카테고리 기능 구현 (tags + post_tags 테이블 + 필터링)
④ 검색 기능 구현 (제목/내용 검색 + 검색 페이지)
⑤ Vercel 배포 + 전 기능 동작 확인
⑥ README.md + AI_LOG.md 작성
⑦ 배포 URL + GitHub 저장소 제출


---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot에게 확장 기능 단위로 구현을 요청한다. 한 번에 전체를 요청하지 말고, A회차에서 배운 "기능 하나씩 만들고 → 테스트하고 → 커밋" 패턴을 따른다.

### 블로그 확장 최종 점검 — MCP · Skills 총정리

블로그 확장에서는 지금까지 배운 **모든 MCP와 Skills**를 활용한다.

| 도구                   | 프로젝트에서의 활용                                                            |
| ---------------------- | ------------------------------------------------------------------------------ |
| **Context7**           | 확장 기능 구현 시 Next.js/Supabase/Tailwind 최신 API를 확인한다.               |
| **Supabase MCP**       | 확장 테이블 스키마 확인, RLS 정책 검증, 데이터 조회를 Copilot 안에서 수행한다. |
| **nextjs-basic-check** | 전체 프로젝트의 App Router 구조, Server/Client 컴포넌트 구분을 점검한다.       |
| **secret-guard**       | **제출 전 필수** — 모든 파일에서 키 노출, `.env.local` 미사용을 최종 점검한다. |

**제출 전 최종 점검 프롬프트**:

- `nextjs-basic-check 기준으로 이 프로젝트의 App Router 규칙 위반을 모두 찾아줘`
- `secret-guard 기준으로 이 프로젝트에서 API 키 노출이나 보안 위험을 모두 찾아줘`
- `Supabase 프로젝트의 RLS 정책 목록을 보여줘` (Supabase MCP)

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:

> "블로그에 기능 추가해줘"

문제: 어떤 기능인지, 테이블 구조, RLS, UI 세부사항이 전혀 명시되지 않았다.

✅ 좋은 프롬프트:

> "#file:ARCHITECTURE.md #file:copilot-instructions.md
> 블로그에 댓글 기능을 추가하기 위한 Supabase SQL을 만들어줘.
> 테이블: comments (id bigint PK, post_id bigint FK→posts, user_id uuid FK→profiles, content text, created_at timestamptz)
> RLS: 누구나 읽기, 로그인만 작성, 작성자만 삭제
> 인덱스: created_at DESC"

**구현 순서** (A회차에서 배운 4단계):

```
확장 테이블(SQL + RLS) → CRUD(lib/ 함수) → UI(app/ 페이지) → 배포(Vercel)
```

---

## 개인 실습

### 체크포인트 1: 설계서 최신화 + 확장 테이블 구축

**목표**: ARCHITECTURE.md에 확장 기능을 반영하고, 새 테이블과 RLS를 설정한다.

① ARCHITECTURE.md에 확장 테이블을 추가한다:

- comments 테이블: post_id, user_id, content 컬럼 설계
- tags + post_tags 테이블: M:N 관계 설계
- 각 테이블의 RLS 정책 명시

② Supabase SQL Editor에서 확장 테이블을 생성한다 (A회차 가이드 참고)
③ RLS 정책을 생성한다 (Ch11에서 배운 4대 정책 패턴 적용)
④ context.md를 업데이트한다 — 현재 진행 상황 기록

### 체크포인트 2: 댓글 + 태그 기능 구현

**목표**: 블로그 확장의 핵심 기능(댓글, 태그)을 Copilot과 협업하여 구현한다.

① 댓글 기능부터 구현한다. Copilot에게 요청:

> "#file:ARCHITECTURE.md #file:context.md
> 블로그 글 상세 페이지(/posts/[id])에 댓글 기능을 추가해줘.
> 파일: lib/comments.ts (CRUD 함수) + components/CommentSection.tsx (UI)
> 데이터: comments 테이블의 post_id, user_id, content 사용
> 인증: useAuth()로 로그인 사용자 확인
> 스타일: Tailwind CSS + shadcn/ui"

② 생성된 코드의 4가지 체크포인트를 확인한다:

- import 경로가 올바른가?
- Supabase 클라이언트가 올바른가? (브라우저 vs 서버)
- `"use client"`가 필요한 곳에만 있는가?
- 하드코딩된 값이 없는가?

③ 댓글이 동작하면 Copilot(Agent 모드)에 커밋 요청:

> **Copilot 프롬프트**
>
> "터미널에서 git add, commit을 실행해줘. 커밋 메시지: 'feat: 댓글 기능 구현'"

④ 태그/카테고리 기능 구현: tags + post_tags 테이블 활용 → CRUD 함수 → 글 작성 시 태그 선택 UI → /tags 페이지
⑤ 검색 기능 구현: lib/search.ts → /search 페이지 → 검색 결과 표시
⑥ 시간이 남으면 Should have 기능(좋아요, 관리자 대시보드)을 추가한다

### 체크포인트 3: 검증 + 배포 + 문서화

**목표**: 구현된 기능을 검증하고, 배포하고, 문서를 완성한다.

① 아래 검증 체크리스트를 수행한다
② README.md를 작성한다:

```markdown
# 내 블로그

## 프로젝트 설명

Next.js + Supabase로 만든 블로그 — 댓글, 태그, 검색 기능 포함

## 기술 스택

- Next.js 16 (App Router)
- Tailwind CSS + shadcn/ui
- Supabase (Auth + Database + RLS)
- Vercel (배포)

## 배포 URL

https://my-first-web.vercel.app

## 주요 기능

- 블로그 글 CRUD (작성/조회/수정/삭제)
- 댓글 시스템 (작성/조회/삭제)
- 태그/카테고리 (태그별 필터링)
- 검색 (제목/내용 검색)
```

③ AI_LOG.md에 AI 사용 기록을 최소 5항목 작성한다:

```markdown
## AI 사용 로그

| #   | 요청 내용                | AI 응답 품질 | 수정 사항             |
| --- | ------------------------ | ------------ | --------------------- |
| 1   | comments 테이블 SQL 생성 | 좋음         | FK 관계 수정          |
| 2   | 댓글 CRUD 함수 작성      | 보통         | select 관계 쿼리 수정 |
| ... | ...                      | ...          | ...                   |
```

④ Copilot Chat(Agent 모드)에 배포 요청:

> **Copilot 프롬프트**
>
> "터미널에서 git add, commit, push를 실행해줘."

⑤ 배포된 URL에서 전 기능이 동작하는지 확인한다

---


## 흔한 AI 실수

**표 13.11** Ch13에서 AI가 자주 틀리는 패턴

| AI 실수                                        | 올바른 방법                                       | 발생 원인                  |
| ---------------------------------------------- | ------------------------------------------------- | -------------------------- |
| 존재하지 않는 모듈 import (`Module not found`) | 실제 파일 경로 확인 후 import                     | AI 환각 (없는 패키지 추천) |
| 확장 테이블 RLS 정책 누락으로 데이터 안 보임   | 새 테이블별 최소 SELECT 정책 필수                 | RLS 활성화 후 정책 미생성  |
| 환경 변수 미등록 (Vercel에서 에러)             | Vercel 대시보드에도 환경 변수 등록                | 로컬 ≠ 배포 환경           |
| Hydration 불일치 에러                          | Server/Client 렌더링 결과 일치 확인               | 서버/클라이언트 출력 차이  |
| `auth.uid()` 대신 하드코딩된 UUID              | SQL에서 `auth.uid()` 함수 사용                    | 동적 사용자 ID 미인식      |
| 기존 코드를 무시하고 처음부터 생성             | 기존 블로그 코드를 참조하도록 #file 컨텍스트 제공 | 기존 코드 미인식           |
| comments/tags 테이블에 FK 누락                 | post_id, user_id에 REFERENCES 필수                | 참조 무결성 미설정         |
| M:N 관계(post_tags)의 복합 PK 누락             | PRIMARY KEY (post_id, tag_id) 필수                | 중간 테이블 설계 오류      |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch13 과제"에 아래 세 항목을 제출한다:

```
① 배포 URL
   예: https://my-first-web.vercel.app

② GitHub 저장소 URL
   예: https://github.com/내아이디/my-first-web
   (ARCHITECTURE.md, README.md, AI_LOG.md 포함)

③ AI가 틀린 부분 1개
   예: "Copilot이 comments 테이블의 FK를 빠뜨려서 관계 쿼리가 실패했다.
       post_id에 REFERENCES posts(id)를 추가해서 해결했다."
```

---
