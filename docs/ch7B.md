# Chapter 7. 웹 앱 아키텍처 & AI 디자인 설계 — B회차: 실습

> **미션**: Ch1~6에서 만든 블로그의 **아키텍처 설계서**를 보강한다 — shadcn/ui, 디자인 토큰, DB 스키마 계획

---

## 과제 스펙



Ch1~6에서 만든 블로그에 아키텍처를 보강한다. shadcn/ui 컴포넌트 시스템, 디자인 토큰, DB 스키마 계획을 추가하여 Ch8~12에서 배울 Supabase CRUD, 인증, RLS를 활용할 수 있는 구조로 정비한다.

**제출물**:

① 페이지 맵 보강 (기존 페이지 + 추가 페이지, URL 구조 포함)
② AI 와이어프레임 (Copilot Vision 또는 v0로 생성, 2장 이상)
③ shadcn/ui 테마 (`npx shadcn init` 완료 + 색상 커스터마이징)
④ 데이터 모델 (테이블 2개 이상 + 관계 정의 — Ch8 Supabase 대비)
⑤ copilot-instructions.md (Design Tokens + Component Rules 섹션 포함)
⑥ ARCHITECTURE.md (페이지 맵 + 컴포넌트 계층 + 데이터 모델 통합)
⑦ context.md (프로젝트 현재 상태 기록 — 기술 결정 사항 포함)
⑧ todo.md (전체 작업 체크리스트 — 단계별 구분, 진행률 포함)


---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot Chat에 기존 블로그 프로젝트의 구조를 입력하여 설계서 보강안을 생성한다. AI가 만든 설계서를 그대로 쓰지 말고, A회차에서 배운 "AI 슬롭 방지" 기준으로 반드시 검증·수정한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:
> "블로그 설계서 만들어줘"

문제: 현재 상태, 보강할 부분, 기술 스택이 전혀 명시되지 않아 AI 슬롭이 생성된다.

✅ 좋은 프롬프트:


> "내 블로그 프로젝트의 ARCHITECTURE.md를 보강해줘.
> 기술 스택: Next.js 16 App Router + Tailwind CSS + shadcn/ui + Supabase.
> 기존 페이지: 홈(/), 포스트 목록(/posts), 포스트 작성(/posts/new), 포스트 상세(/posts/[id]).
> 추가할 것: shadcn/ui 컴포넌트 계층, 디자인 토큰, DB 스키마(users, posts 테이블 + FK 관계).
> 인증: 이메일/비밀번호 로그인.
> 각 페이지의 주요 컴포넌트와 데이터 흐름을 포함해줘."


---

## 개인 실습

### 체크포인트 1: 페이지 맵 + 데이터 모델

**목표**: 블로그의 페이지 구조를 보강하고 데이터베이스 모델을 설계한다.

① 기존 블로그의 페이지 맵을 검토한다
② 페이지 맵을 보강한다 — 기존 + 추가 페이지, App Router URL 구조 포함:

```
/               → 홈 (포스트 목록)
/posts          → 포스트 목록
/posts/new      → 포스트 작성
/posts/[id]     → 포스트 상세
/mypage         → 마이페이지
/login          → 로그인
/signup         → 회원가입
```

③ 데이터 모델을 설계한다 — 테이블 2개 이상, 관계(1:N) 정의:

```
profiles (사용자)
├── id: uuid (PK, auth.users 참조)
├── username: text
├── avatar_url: text
└── created_at: timestamptz

posts (포스트)
├── id: uuid (PK)
├── user_id: uuid (FK → profiles.id)
├── title: text
├── content: text
└── created_at: timestamptz
```

④ Copilot에게 블로그에 맞는 데이터 모델을 요청하고, 결과를 검토한다


### 체크포인트 2: 와이어프레임 + shadcn/ui 테마

**목표**: AI로 와이어프레임을 생성하고, shadcn/ui 테마를 설정한다.

① Copilot Vision 또는 v0(https://v0.dev)에 와이어프레임을 요청한다


> "다음 페이지의 와이어프레임을 그려줘:
> 1) 홈 페이지 — 포스트 카드 목록 + 검색바
> 2) 포스트 작성 페이지 — 제목, 내용 입력 폼 + 제출 버튼
> 스타일: 깔끔하고 미니멀, shadcn/ui 컴포넌트 활용"


② shadcn/ui를 초기화한다:

```bash
npx shadcn@latest init
```

③ CSS 변수에서 프로젝트 색상을 커스터마이징한다 (`app/globals.css`):

```css
:root {
  --primary: 220 70% 50%;      /* 프로젝트 메인 색상 */
  --primary-foreground: 0 0% 100%;
}
```

④ 필요한 컴포넌트를 추가한다 (예: `npx shadcn@latest add button card input`)


### 체크포인트 3: 설계 문서 통합 + GitHub push

**목표**: 설계 문서 4종 세트를 완성하고 GitHub에 push한다.

① ARCHITECTURE.md를 보강한다 — 페이지 맵 + 컴포넌트 계층 + 데이터 모델 통합
② copilot-instructions.md를 보강한다 — Design Tokens + Component Rules 섹션 포함
③ context.md를 작성한다 — 현재 상태, 기술 결정 사항 기록
④ todo.md를 작성한다 — 전체 작업 체크리스트 (Ch8~12에서 구현할 항목 포함)
⑤ 아래 검증 체크리스트를 수행한다
⑥ Copilot Chat(Agent 모드)에 배포 요청:

> **Copilot 프롬프트**
>
> "터미널에서 git add, commit, push를 실행해줘."

---


## 흔한 AI 실수

**표 7.15** Ch7에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 방법 | 발생 원인 |
|---------|------------|----------|
| 페이지 맵에 Pages Router 경로 사용 (`/pages/about`) | App Router 경로 사용 (`/app/about/page.tsx`) | Next.js 버전 혼동 |
| 데이터 모델에 `id: int` 사용 | `id: uuid` 사용 (Supabase auth.users와 호환) | PostgreSQL + Supabase 규칙 미인식 |
| copilot-instructions.md에 구체적 파일 경로 누락 | 프로젝트 구조와 기술 스택을 명시 | 맥락 부족 |
| 와이어프레임에 존재하지 않는 컴포넌트 사용 | shadcn/ui에 실제로 있는 컴포넌트만 사용 | AI 환각 |
| CSS 변수 형식 오류 (`#3b82f6` 대신 HSL 사용) | `--primary: 220 70% 50%` (HSL 공백 구분) | shadcn/ui의 CSS 변수 형식 미인식 |
| ARCHITECTURE.md에 구현 코드 포함 | 설계 수준의 구조만 기술 (코드는 Ch8부터) | 설계와 구현 단계 혼동 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch7 과제"에 아래 두 항목을 제출한다:

```
① GitHub 저장소 URL
   예: https://github.com/내아이디/my-first-web
   (ARCHITECTURE.md, copilot-instructions.md, context.md, todo.md 포함)

② AI가 틀린 부분 1개
   예: "Copilot이 데이터 모델에서 id를 int로 생성했는데,
       Supabase auth.users와 연결하려면 uuid여야 해서 수정했다."
```

---
