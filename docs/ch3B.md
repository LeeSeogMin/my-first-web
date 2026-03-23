# Chapter 3. HTML 시맨틱과 Tailwind CSS — B회차: 실습

> **미션**: 블로그 메인 페이지를 Copilot과 함께 만들고 배포한다

---

## 과제 스펙



**블로그 메인 페이지**를 만든다:

① 내비게이션 바 — 사이트 제목 + 메뉴 링크 (홈, 로그인)
② 게시글 목록 — 카드 형태, 최소 3개의 더미 게시글 (제목, 내용 미리보기, 작성자, 날짜)
③ 반응형 — 모바일 1열, 태블릿/데스크톱 2열 이상
④ 시맨틱 태그 — header, nav, main, article, footer 사용
⑤ Tailwind CSS — 유틸리티 클래스로 스타일링


---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot Chat에 프롬프트를 입력하여 블로그 레이아웃을 생성한다. 생성된 코드를 그대로 쓰지 말고, A회차에서 배운 기준으로 반드시 검증한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:
> "블로그 페이지 만들어줘"

문제: 어떤 구조인지, 어떤 스타일인지, 어떤 태그를 써야 하는지 전혀 알려주지 않았다.

✅ 좋은 프롬프트:


> "Next.js App Router의 app/page.tsx에 블로그 메인 페이지를 만들어줘.
> 구조: header(nav 포함) → main(게시글 카드 목록) → footer.
> 시맨틱 태그 사용 (header, nav, main, article, footer).
> Tailwind CSS로 스타일링.
> 게시글 카드: 제목, 내용 미리보기, 작성자, 날짜 포함.
> 반응형: 모바일 grid-cols-1, md:grid-cols-2.
> 더미 게시글 3개 포함."


---

## 개인 실습

### 체크포인트 1: HTML 뼈대 + 시맨틱 태그

**목표**: 페이지의 시맨틱 구조를 완성한다.

① Copilot Chat에 프롬프트를 입력하여 블로그 레이아웃 코드를 생성한다
② Copilot이 직접 파일을 수정한다 — 변경된 코드를 확인
③ **시맨틱 태그 확인**: header, nav, main, article, footer가 모두 있는지 검사한다
④ **heading 계층 확인**: h1 → h2 → h3 순서가 맞는지 검사한다
⑤ 문제가 있으면 직접 수정하거나 Copilot에게 수정을 요청한다


### 체크포인트 2: Tailwind 스타일링 + 반응형

**목표**: 보기 좋은 카드 레이아웃 + 반응형을 완성한다.

① 카드에 Tailwind 클래스를 추가한다 (bg-white, rounded-lg, shadow, p-6 등)
② Grid 반응형을 적용한다 (grid-cols-1 md:grid-cols-2)
③ 내비게이션 바에 Flexbox를 적용한다 (flex justify-between items-center)
④ hover 효과를 추가한다 (hover:shadow-lg transition)
⑤ DevTools 디바이스 모드(`Cmd+Shift+M`)로 반응형을 확인한다

Copilot에게 스타일 개선을 요청할 때:


> "이 게시글 카드에 hover 시 그림자가 커지는 효과와 부드러운 전환을 추가해줘. Tailwind CSS 사용."

### 체크포인트 3: 검증 + 배포

**목표**: AI 코드를 검증하고 배포한다.

① 아래 검증 체크리스트를 수행한다
② 문제가 있으면 수정한다
③ Copilot Chat(Agent 모드)에 배포 요청:

> **Copilot 프롬프트**
>
> "터미널에서 git add, commit, push를 실행해줘."
④ Vercel 대시보드에서 배포 완료를 확인한다
⑤ 배포된 URL을 브라우저에서 열어 동작을 확인한다
⑥ 모바일/데스크톱 모두에서 레이아웃이 올바른지 확인한다

---


## 흔한 AI 실수

**표 3.15** Ch3에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 코드 | 발생 원인 |
|---------|-----------|----------|
| `<div>` 범벅 (시맨틱 태그 미사용) | `<header>`, `<main>`, `<article>` 등 | AI가 구조보다 스타일에 집중 |
| `class="..."` | `className="..."` | 순수 HTML 학습 데이터의 영향 |
| `for="..."` | `htmlFor="..."` | 순수 HTML 학습 데이터의 영향 |
| h1 → h3 (h2 건너뜀) | h1 → h2 → h3 | 시각적 크기만 맞추려 함 |
| 반응형 미적용 (고정 너비) | `grid-cols-1 md:grid-cols-2` | 데스크톱 기준으로 생성 |
| Tailwind 3 문법 사용 | Tailwind 4 문법 확인 | AI 학습 시점의 버전 차이 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch3 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 모든 태그를 <div>로 생성했는데,
       <header>, <main>, <article>로 수정했다."
```

---
