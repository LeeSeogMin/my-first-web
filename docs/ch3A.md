# Chapter 3. HTML 시맨틱과 Tailwind CSS

> **미션**: Copilot과 함께 블로그 레이아웃을 시맨틱 태그로 마크업하고 Tailwind CSS로 스타일링한다

---

## 학습목표

1. HTML5 시맨틱 태그의 의미를 이해하고 올바르게 사용할 수 있다
2. Tailwind CSS의 유틸리티 클래스를 읽고 해석할 수 있다
3. Flexbox와 Grid로 레이아웃을 구성하고 반응형을 적용할 수 있다
4. AI가 생성한 HTML/CSS 코드에서 흔한 실수를 발견할 수 있다

---

## 3.1 HTML 시맨틱 구조

### 시맨틱 태그란

`<div>`는 "아무 의미 없는 상자"이다. **시맨틱 태그**는 "이 영역이 무엇인지" 알려주는 이름표가 붙은 상자이다.

시맨틱 태그를 써야 하는 이유:

1. **검색 엔진**이 페이지 구조를 이해한다 (SEO)
2. **스크린 리더**가 시각 장애 사용자에게 구조를 안내한다 (접근성)
3. **AI(Copilot)**가 영역의 목적을 파악하여 정확한 코드를 생성한다

### 주요 시맨틱 태그

| 태그 | 역할 | 블로그 예시 |
|------|------|-------------|
| `<header>` | 머리말 영역 | 사이트 제목, 로고 |
| `<nav>` | 내비게이션 | 메뉴 링크 |
| `<main>` | 핵심 콘텐츠 (1페이지 1개) | 게시글 목록 |
| `<article>` | 독립적 콘텐츠 | 게시글 1개 |
| `<aside>` | 보조 정보 | 사이드바, 카테고리 |
| `<footer>` | 바닥글 영역 | 저작권, 연락처 |

블로그 레이아웃 구조:

```text
┌─────────────────────────────┐
│         <header>            │
│  사이트 제목 + <nav> 메뉴    │
├─────────────────────────────┤
│ <main>                      │
│  <article> <article> ...    │
├─────────────────────────────┤
│         <footer>            │
└─────────────────────────────┘
```

### heading 계층

heading 태그(`<h1>`~`<h6>`)는 반드시 순서대로 사용한다. 한 페이지에 `<h1>`은 1개만.

```html
<!-- ✅ 올바른 -->
<h1>블로그</h1>
<h2>최신 게시글</h2>
<h3>React 19 새 기능</h3>

<!-- ❌ h2를 건너뛰면 안 됨 -->
<h1>블로그</h1>
<h3>최신 게시글</h3>
```

> **AI 주의**: Copilot은 heading 계층을 무시하고 시각적 크기만 맞추려는 경향이 있다.

### HTML 기본 구조 (참고)

Next.js에서는 `app/layout.tsx`가 자동으로 처리하지만, AI 출력 검증을 위해 알아둔다:

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>블로그</title>
  </head>
  <body>
    <!-- 페이지 내용 -->
  </body>
</html>
```

### 🤖 실습: 블로그 시맨틱 뼈대 만들기

Copilot Chat(Agent 모드)에서 실행:

> "app/page.tsx를 블로그 메인 페이지로 수정해줘.
> 구조: header(사이트 제목 + nav) → main(게시글 카드 3개) → footer.
> 시맨틱 태그 사용: header, nav, main, article, footer.
> 게시글은 제목, 내용 미리보기, 작성자, 날짜 포함.
> 스타일링은 아직 하지 말고 구조만 잡아줘."

**검증**:

- [ ] `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` 모두 있는가?
- [ ] `<h1>` → `<h2>` → `<h3>` 계층이 올바른가?
- [ ] `className`을 사용했는가? (`class` 아님)
- [ ] `<div>` 범벅이 아닌가?

---

## 3.2 Tailwind CSS 기초

### 유틸리티 클래스란

Tailwind는 "이미 정의된 유틸리티 클래스를 HTML에 직접 붙이는" 방식이다. 별도 CSS 파일이 필요 없다.

```tsx
{/* 전통 CSS: 별도 파일 필요 */}
<div className="card">제목</div>

{/* Tailwind: 한 파일에서 완결 */}
<div className="p-4 bg-white rounded-lg">제목</div>
```

AI와 궁합이 좋다 — Copilot이 한 파일만 보고도 전체 디자인을 파악할 수 있다.

### 클래스 읽는 법: `속성-값` 패턴

| 클래스 | 읽는 법 | CSS 변환 |
|--------|---------|----------|
| `p-4` | padding 4단위 | `padding: 16px` |
| `px-6` | padding 좌우 6단위 | `padding-left: 24px; padding-right: 24px` |
| `mt-2` | margin 위 2단위 | `margin-top: 8px` |
| `text-lg` | 텍스트 크게 | `font-size: 18px` |
| `font-bold` | 글씨 굵게 | `font-weight: 700` |
| `bg-blue-500` | 배경 파란색 500 | `background: #3b82f6` |
| `rounded-lg` | 둥근 모서리 | `border-radius: 8px` |
| `w-full` | 가로 100% | `width: 100%` |

**간격**: 1단위 = 4px → `p-1`=4px, `p-2`=8px, `p-4`=16px, `p-8`=32px

**색상**: `{색상}-{단계}` (50=밝음, 500=중간, 900=어두움)

> VS Code에서 **Tailwind CSS IntelliSense** 확장을 설치하면 클래스명 자동완성과 미리보기가 지원된다.

### 🤖 실습: 블로그 카드 스타일링

앞서 만든 시맨틱 뼈대에 Tailwind 스타일을 입힌다. Copilot Chat(Agent 모드):

> "현재 app/page.tsx의 블로그 레이아웃에 Tailwind CSS 스타일을 추가해줘.
> 게시글 카드: bg-white rounded-lg shadow p-6, hover:shadow-lg transition.
> 전체 레이아웃: max-w-4xl mx-auto p-4.
> 제목: text-lg font-bold, 본문: text-gray-600, 날짜: text-sm text-gray-400."

**검증**:

- [ ] `className`으로 되어 있는가?
- [ ] Tailwind 클래스가 읽히는가? (속성-값 패턴으로 해석해본다)

---

## 3.3 레이아웃과 반응형

### Flexbox — 한 줄 배치

내비게이션 바가 대표적이다.

| 클래스 | 역할 |
|--------|------|
| `flex` | Flexbox 활성화 |
| `flex-col` | 세로 방향 배치 |
| `justify-between` | 양 끝 정렬 |
| `items-center` | 세로축 가운데 정렬 |
| `gap-4` | 요소 사이 간격 16px |

### Grid — 격자 배치

게시글 카드 목록이 대표적이다.

| 클래스 | 역할 |
|--------|------|
| `grid` | Grid 활성화 |
| `grid-cols-2` | 2열 격자 |
| `grid-cols-3` | 3열 격자 |
| `gap-4` | 격자 사이 간격 |

### 반응형 브레이크포인트

Tailwind는 **모바일 우선** — 기본이 모바일, 화면이 커지면 스타일을 추가한다.

| 접두어 | 최소 너비 | 대상 |
|--------|-----------|------|
| (없음) | 0px | 모바일 (기본) |
| `sm:` | 640px | 큰 모바일 |
| `md:` | 768px | 태블릿 |
| `lg:` | 1024px | 데스크톱 |

예시 — 모바일 1열, 태블릿 2열:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* 카드들 */}
</div>
```

### 🤖 실습: 반응형 레이아웃 적용

Copilot Chat(Agent 모드):

> "app/page.tsx의 블로그 레이아웃을 반응형으로 수정해줘.
> 내비게이션: flex justify-between items-center.
> 게시글 카드 목록: grid grid-cols-1 md:grid-cols-2 gap-6.
> footer: 중앙 정렬, text-sm text-gray-400."

**검증**:

- [ ] DevTools 디바이스 모드(`Cmd+Shift+M`)로 모바일/태블릿/데스크톱 확인
- [ ] 모바일에서 1열, 태블릿 이상에서 2열인가?
- [ ] 내비게이션이 가로 정렬되어 있는가?

---

## 3.4 폼 요소와 접근성

블로그에서 폼은 "글 작성", "로그인", "검색"에 사용된다. Ch5에서 작성 페이지를 만들 때 필요한 기초이다.

### 주요 폼 요소

| 요소 | 용도 | 예시 |
|------|------|------|
| `<input type="text">` | 한 줄 텍스트 | 제목 입력 |
| `<input type="email">` | 이메일 (자동 검증) | 로그인 |
| `<input type="password">` | 비밀번호 (마스킹) | 로그인 |
| `<textarea>` | 여러 줄 텍스트 | 게시글 본문 |
| `<button>` | 제출/클릭 | 등록 버튼 |

### label과 접근성

모든 `<input>`에는 반드시 `<label>`을 연결한다.

```tsx
{/* ✅ JSX에서는 htmlFor 사용 */}
<label htmlFor="title">제목</label>
<input id="title" type="text" />
```

> **AI 주의**: Copilot은 `for`(HTML)를 쓰기 쉽다. JSX에서는 반드시 `htmlFor`이다.

---

## 흔한 AI 실수

| AI 실수 | 올바른 코드 | 원인 |
|---------|------------|------|
| `<div>` 범벅 (시맨틱 태그 미사용) | `<header>`, `<main>`, `<article>` | 구조보다 스타일에 집중 |
| `class="..."` | `className="..."` | HTML 학습 데이터 |
| `for="..."` | `htmlFor="..."` | HTML 학습 데이터 |
| h1 → h3 (h2 건너뜀) | h1 → h2 → h3 | 시각적 크기만 맞추려 함 |
| 반응형 미적용 (고정 너비) | `grid-cols-1 md:grid-cols-2` | 데스크톱 기준으로 생성 |

---

## 🤖 배포

Copilot Chat(Agent 모드):

> "터미널에서 git add, commit, push를 실행해줘. 커밋 메시지: 'Ch3: 블로그 레이아웃 + Tailwind 스타일링'"

배포 URL에서 모바일/데스크톱 모두 확인한다.

---

## 핵심 정리

1. **시맨틱 태그**로 페이지 구조를 명확히 한다 (header, nav, main, article, footer)
2. **Tailwind 클래스**는 `속성-값` 패턴으로 읽는다 (p-4 = padding 16px)
3. **반응형**은 모바일 우선 — `md:`, `lg:` 접두어로 큰 화면 스타일을 추가한다

---

## 제출 안내 (Google Classroom)

```text
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 모든 태그를 <div>로 생성해서
       <header>, <main>, <article>로 수정했다."
```

---
