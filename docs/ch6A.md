# Chapter 6. Next.js 상태 관리와 데이터 페칭

> **미션**: 블로그에 인터랙션을 더한다 — 상태 관리와 데이터 페칭으로 동적 UI를 만든다

---

## 학습목표 (이번 수업: 6.1 + 6.2)

1. `useState`가 무엇인지, 일반 변수와 무엇이 다른지 설명할 수 있다
2. 클릭, 입력, 폼 제출에 이벤트 핸들러를 연결할 수 있다
3. 배열 state를 삭제할 때 `filter`를 써야 하는 이유를 말할 수 있다
4. `useEffect`가 언제 실행되는지 설명하고, 의존성 배열 `[]`의 의미를 안다

---

## 🤖 Copilot 활용 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot Chat(Agent 모드)에 프롬프트를 입력하여 상태 관리와 이벤트 처리를 구현한다. 생성된 코드를 그대로 쓰지 말고, 이 자료에서 배운 기준으로 반드시 검증한다.

---

## 출발점 맞추기

🤖 ask가 아니라 **agent 모드**인지 항상 확인한다.

Ch5에서 만든 블로그가 아래 조건을 모두 만족하는지 확인한다.

터미널 - 새 터미널 - `npm run dev` → `http://localhost:3000` 클릭

- [ ] `/posts` 접속 시 게시글 카드 3개가 보이는가?
- [ ] 카드 클릭 시 `/posts/1` 등 상세 페이지로 이동하는가?
- [ ] `/posts/new` 접속 시 제목/내용 입력 폼이 보이는가?
- [ ] 내비게이션에 홈, 블로그, 새 글 쓰기 링크가 있는가?
- [ ] `lib/posts.ts` 파일에 더미 데이터(posts 배열)가 있는가?

> 조건을 갖추지 못한 경우, Ch5 출발점 맞추기 섹션의 Copilot 프롬프트를 다시 실행한다.

---

## 6.1 useState — 화면을 바꾸는 방법

Ch5에서 블로그 페이지를 만들었지만 아직 "동작"이 없다. 버튼을 눌러도 반응이 없고, 검색창에 입력해도 아무 변화가 없다. 이번 섹션에서는 화면을 **변하게** 만드는 방법을 배운다.

### 6.1.1 왜 일반 변수로는 안 되는가

직관적으로 이렇게 하면 될 것 같다:

```tsx
let count = 0;

function LikeButton() {
  return (
    <button onClick={() => { count = count + 1; }}>
      ❤️ {count}
    </button>
  );
}
```

하지만 이 코드는 작동하지 않는다. **버튼을 눌러도 숫자가 바뀌지 않는다.**

이유: React는 `count`가 바뀐 것을 모른다. 변수가 바뀌었다고 해서 화면을 자동으로 다시 그려주지 않는다. 마치 칠판에 쓴 숫자를 지우개로 지우고 다시 썼는데, 학생들은 눈을 감고 있어서 아무도 못 본 것과 같다.

### 6.1.2 useState — React에게 알려주는 방법

**실제 쓰는 경우 4가지**:
1. 좋아요 버튼 클릭 수 (숫자가 바뀔 때 화면 갱신)
2. 검색창 입력값 추적 (6.1.3에서 이어짐)
3. 폼의 제목/내용 관리
4. 모달 열림/닫힘 상태 (true/false)

즉, **"사용자가 뭔가를 하면 화면이 바뀌어야 할 때"** 쓴다.

`useState`를 쓰면 값이 바뀔 때 React가 자동으로 화면을 다시 그린다.

```tsx
"use client"; // 브라우저에서 실행할 파일임을 Next.js에 알림

import { useState } from "react"; // useState를 react에서 가져옴

function LikeButton() {
  // count: 현재 숫자 (처음엔 0)
  // setCount: 숫자를 바꾸는 함수 (이걸 써야 화면이 갱신됨)
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)} // 클릭하면 count를 1 올림
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      ❤️ {count} {/* 현재 count 값을 화면에 표시 */}
    </button>
  );
}
```

`useState`의 생김새:

```
const [값, 값을바꾸는함수] = useState(초기값);
      ↑      ↑                        ↑
    count  setCount                   0
```

### 6.1.3 이벤트 — 사용자가 입력한 값 추적하기

아래 더미 데이터를 예시로 사용한다. 6.1.4와 실습까지 이 데이터를 계속 쓴다.

```tsx
const posts = [
  { id: 1, title: "React 19 새 기능 정리" },
  { id: 2, title: "Tailwind CSS 4 변경사항" },
  { id: 3, title: "Next.js 16 App Router 가이드" },
];
```

사용자가 검색창에 뭔가 입력하면, React가 그 값을 추적해서 `query` state에 저장한다:

```tsx
"use client";
import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState(""); // 검색어, 처음엔 빈 문자열

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)} // 키 누를 때마다 query 업데이트
        placeholder="검색어 입력"
        className="border px-3 py-2 rounded"
      />
      <p>현재 검색어: {query}</p> {/* query가 바뀔 때마다 화면에 반영 */}
    </div>
  );
}
```

`onChange={(e) => setQuery(e.target.value)}`를 풀어 읽으면:

```
(e)            ← React가 건네주는 상자. "어디서, 어떤 값이 바뀌었는지" 담겨있음
e.target       ← 이벤트가 일어난 요소 (= 이 input 태그)
e.target.value ← 그 input에 지금 적혀있는 텍스트
setQuery(...)  ← 그 텍스트로 query state를 업데이트
```

이 시점에서 `query`에는 검색어가 저장되어 있지만, 아직 목록에 반영되지 않는다. 다음 단계에서 `filter`로 연결한다.

### 6.1.4 filter — 저장된 검색어로 목록 걸러내기

`filter`는 배열에서 조건에 맞는 것들만 골라 **새 배열**을 만든다. 위의 `posts`에 적용하면:

```tsx
// query가 "React"일 때
posts.filter(p => p.title.includes("React"))

// 동작 방식:
// "React 19 새 기능 정리"     → includes("React") → true  → 남김
// "Tailwind CSS 4 변경사항"   → includes("React") → false → 제거
// "Next.js 16 App Router 가이드" → includes("React") → false → 제거
// 결과: [{ id: 1, title: "React 19 새 기능 정리" }]
```

---

> **정리**: `setQuery`(6.1.3) + `filter`(6.1.4)를 합치면 검색이 된다.

```tsx
"use client";
import { useState } from "react";

const posts = [
  { id: 1, title: "React 19 새 기능 정리" },
  { id: 2, title: "Tailwind CSS 4 변경사항" },
  { id: 3, title: "Next.js 16 App Router 가이드" },
];

function SearchablePosts() {
  const [query, setQuery] = useState("");

  // query가 바뀔 때마다 filter가 재실행되어 filtered가 새로 계산됨
  const filtered = posts.filter(p => p.title.includes(query));

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어 입력"
        className="border px-3 py-2 rounded w-full mb-4"
      />
      {filtered.length === 0 && <p>검색 결과가 없습니다</p>}
      <ul>
        {filtered.map(p => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

흐름: "React" 입력 → `setQuery("React")` → `query = "React"` → `filter` 재실행 → 1번 글만 남음 → 화면 갱신

---

### 🤖 실습: 검색 + 삭제 기능 구현

**목표**: 위 예시를 실제 블로그(`lib/posts.ts`)에 Copilot으로 구현한다.

**현실 버전**:
> "블로그 게시글 제목 검색 기능 추가해줘. 검색창은 components/SearchBar.tsx로 분리하고, 삭제 버튼도 추가해줘."

**시험 버전**:
> "블로그 목록 페이지에 검색과 삭제 기능을 추가해줘.
> SearchBar는 'use client' Client Component로 분리 (components/SearchBar.tsx).
> useState로 검색어 관리, posts.filter(p => p.title.includes(query))로 검색.
> 삭제 버튼 클릭 시 window.confirm 후 setPosts(posts.filter(p => p.id !== id))로 제거.
> push/splice 사용 금지. Next.js 16.2.1, Tailwind CSS 4, App Router."

#### 검증

- [ ] `components/SearchBar.tsx` 맨 위에 `"use client"` 가 있는가?
- [ ] `app/posts/page.tsx`에는 `"use client"` 가 **없는가**?
- [ ] 검색에 `posts.filter(p => p.title.includes(query))`를 사용했는가?
- [ ] 삭제에 `posts.filter(p => p.id !== id)`를 사용했는가?
- [ ] 검색 결과 0건 시 "검색 결과가 없습니다" 메시지가 있는가?

#### 브라우저 확인

- [ ] 검색창에 입력하면 실시간으로 목록이 필터링되는가?
- [ ] 삭제 버튼 → 확인 → 목록에서 사라지는가?

---

## 6.2 useEffect — 페이지가 열릴 때 실행하기

### 6.2.1 언제 쓰는가

`useState`는 "클릭했을 때", "입력했을 때"처럼 **사용자 동작**에 반응한다. 그런데 사용자가 아무것도 안 해도 페이지가 열리자마자 자동으로 실행되어야 하는 것들이 있다:

**실제 쓰는 경우 3가지**:
1. 페이지가 열리면 → 서버에서 게시글 목록을 가져온다
2. 페이지가 열리면 → 로그인 상태를 확인한다
3. 검색어가 바뀌면 → API를 새로 호출해서 결과를 갱신한다

즉, **"사용자가 직접 클릭하지 않아도 자동으로 실행해야 할 때"** 쓴다.

이럴 때 `useEffect`를 쓴다. 이름 그대로 "화면에 나타난 **후** 효과를 준다".

### 6.2.2 기본 사용법

```tsx
"use client";

import { useState, useEffect } from "react"; // useEffect도 같이 import

function PostList() {
  const [posts, setPosts] = useState([]);   // 처음엔 빈 배열
  const [isLoading, setIsLoading] = useState(true); // 로딩 중 여부

  useEffect(() => {
    // 이 안의 코드는 컴포넌트가 화면에 나타난 직후 1회 실행된다
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())   // 응답을 JSON으로 변환
      .then((data) => {
        setPosts(data);            // 받아온 데이터를 state에 저장
        setIsLoading(false);       // 로딩 끝
      });
  }, []); // ← 이 빈 배열이 중요! "딱 한 번만 실행"이라는 의미

  // 로딩 중일 때 표시할 화면
  if (isLoading) return <p>불러오는 중...</p>;

  // 데이터가 도착하면 목록 표시
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

`useEffect`의 구조:

```
useEffect(() => {
  // 실행할 코드
}, []);
   ↑
   의존성 배열: 언제 실행할지 결정
   [] = 처음 한 번만
```

### 6.2.3 의존성 배열 — 언제 실행할지 결정

빈 배열 `[]`만 쓰면 처음 한 번이고, 변수를 넣으면 그 변수가 바뀔 때마다 실행된다.

| 쓰는 방법 | 언제 실행 |
|-----------|-----------|
| `[]` | 페이지가 열릴 때 딱 한 번 |
| `[query]` | 처음 한 번 + `query`가 바뀔 때마다 |

예: 검색어가 바뀔 때마다 API를 새로 호출하고 싶다면:

```tsx
useEffect(() => {
  // query가 바뀔 때마다 이 코드가 실행됨
  fetch(`/api/posts?search=${query}`)
    .then(res => res.json())
    .then(data => setPosts(data));
}, [query]); // query를 배열에 넣음
```

> **⚠️ AI 주의**: Copilot이 useEffect를 만들 때 `[]`를 빠뜨리는 경우가 있다. 배열이 없으면 렌더링될 때마다 계속 실행되어 서버를 무한 호출한다. 반드시 확인한다.

---

### 🤖 실습: 검색 기능 구현

**목표**: `useState`와 `onChange`를 써서 게시글 제목 실시간 검색을 만든다.

**현실 버전**:
> "블로그 게시글 제목 검색 기능 추가해줘. 검색창은 components/SearchBar.tsx로 분리해줘."

**시험 버전**:
> "블로그 목록 페이지에 검색 기능을 추가해줘.
> SearchBar는 'use client' Client Component로 분리 (components/SearchBar.tsx).
> useState로 검색어를 관리하고, posts 배열을 filter로 제목 검색.
> 검색 결과가 없으면 '검색 결과가 없습니다' 표시.
> Next.js 16.2.1, Tailwind CSS 4, App Router."

#### 검증

- [ ] `components/SearchBar.tsx` 맨 위에 `"use client"` 가 있는가?
- [ ] `app/posts/page.tsx`에는 `"use client"` 가 **없는가**?
- [ ] `posts.filter()`로 검색을 구현했는가? (`push`, `splice` 없음)
- [ ] 검색 결과 0건 시 메시지를 표시하는가?

#### 브라우저 확인

- [ ] 검색창에 입력하면 실시간으로 목록이 필터링되는가?
- [ ] 없는 제목을 입력하면 "검색 결과가 없습니다"가 표시되는가?

---

### 🤖 실습: 게시글 작성 폼 + 삭제 기능

**목표**: 작성 폼에 `useState`를 연결하고, 삭제 시 `filter`로 제거한다.

**현실 버전**:
> "게시글 작성 폼에 useState 연결해줘. 제목이 비어있으면 경고. 게시글 카드에 삭제 버튼도 추가해줘."

**시험 버전**:
> "① app/posts/new/page.tsx: useState로 title, content를 객체로 관리.
> 제출 시 title이 비어있으면 alert 경고, 통과하면 /posts로 이동.
> 'use client', useRouter from 'next/navigation' 사용.
> ② 게시글 카드에 삭제 버튼 추가.
> window.confirm 확인 후 posts.filter()로 제거. push/splice 사용 금지.
> Next.js 16.2.1, Tailwind CSS 4, App Router."

#### 검증

- [ ] `"use client"` 가 파일 맨 위에 있는가?
- [ ] `useRouter`를 `next/navigation`에서 import했는가? (`next/router` 아님)
- [ ] 빈 제목 제출 시 경고가 표시되는가?
- [ ] 삭제 시 `posts.filter()` 를 사용하고 `push/splice` 는 없는가?

#### 브라우저 확인

- [ ] `/posts/new`에서 제목 빈 채 제출 시 경고가 표시되는가?
- [ ] 게시글 삭제 버튼 → 확인 → 목록에서 사라지는가?

---

## 6.3 Server Component vs Client Component

이것은 Next.js App Router에서 **가장 중요한 개념**이다. Ch5에서 `"use client"`를 몇 번 사용했는데, 이제 정확히 이해할 차례이다.

### 6.3.1 "use client" 지시어

Next.js App Router에서 모든 컴포넌트는 기본적으로 **서버 컴포넌트**(Server Component)이다. 서버에서 실행되어 HTML을 생성한 후 브라우저에 전송한다. 브라우저에서 인터랙션(클릭, 입력)이 필요하면 파일 맨 위에 `"use client"`를 추가하여 **클라이언트 컴포넌트**(Client Component)로 전환한다:

```tsx
// 서버 컴포넌트 (기본) — "use client" 없음
export default async function PostsPage() {
  const posts = await fetchPosts(); // 서버에서 직접 데이터 가져옴
  return <PostList posts={posts} />;
}

// 클라이언트 컴포넌트 — "use client" 있음
"use client";
interface PostListProps {
  posts: Post[];
}
function PostList({ posts }: PostListProps) {
  const [query, setQuery] = useState<string>(""); // useState 사용 가능
  // ...
}
```

### 6.3.2 언제 서버 컴포넌트를 쓰는가

- 데이터를 가져오기만 하고 사용자 인터랙션이 없을 때
- API 키나 데이터베이스에 직접 접근할 때 (보안)

### 6.3.3 언제 클라이언트 컴포넌트를 쓰는가

- `useState`, `useEffect`, `useRouter` 같은 **Hook**을 사용할 때
- `onClick`, `onChange` 같은 **이벤트 핸들러**가 필요할 때
- 브라우저 API(localStorage, window)를 사용할 때

**표 6.5** Server Component vs Client Component

| 항목 | Server Component | Client Component |
|------|-----------------|-----------------|
| 선언 | 기본 (아무것도 안 씀) | `"use client"` 파일 맨 위 |
| 실행 위치 | 서버 | 브라우저 (+ 서버 초기 렌더링) |
| useState/useEffect | 사용 불가 | 사용 가능 |
| onClick/onChange | 사용 불가 | 사용 가능 |
| async/await | 컴포넌트 자체에서 가능 | 컴포넌트 자체에서 불가 |
| 데이터베이스 접근 | 가능 (보안) | 불가 (Supabase 클라이언트 제외) |
| 번들 크기 | 브라우저에 포함 안 됨 | 브라우저에 포함됨 |

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:
> "게시글 목록 페이지 만들어줘"

✅ 좋은 프롬프트:
> "[버전 고정] Next.js 16.2.1, React 19.2.4, Tailwind CSS 4 기준으로 작성해줘.
> [규칙] App Router만 사용하고 next/router, pages router, 구버전 API는 사용하지 마.
> [검증] 불확실하면 현재 프로젝트 package.json 기준으로 버전을 먼저 확인하고 답해줘.
> app/posts/page.tsx를 Server Component로 만들어줘. 데이터는 lib/posts.ts에서 가져와. 검색 기능이 필요한 SearchBar는 별도 Client Component(components/SearchBar.tsx)로 분리해줘. 'use client'는 SearchBar에만 적용."

나쁜 프롬프트는 AI가 전체 페이지를 `"use client"`로 만들어 버릴 수 있다. 서버/클라이언트 구분을 명시하면 올바른 구조가 나온다.

---

## 6.4 데이터 페칭 패턴

### 6.4.1 서버 컴포넌트에서 fetch

`async`가 함수 앞에 붙으면 그 함수 안에서 `await`를 쓸 수 있다. **"데이터가 올 때까지 여기서 잠깐 기다려"** 라는 뜻이다.

클라이언트 컴포넌트에서는 useEffect + useState가 필요했다:
```tsx
// 클라이언트 방식 — 코드가 길다
useEffect(() => {
  fetch("...").then(res => res.json()).then(data => setPosts(data));
}, []);
```

서버 컴포넌트는 함수 앞에 `async`만 붙이면 `await`로 직접 기다릴 수 있다:
```tsx
// 서버 방식 — 일반 코드처럼 읽힌다
const res = await fetch("...");   // 응답이 올 때까지 기다림
const posts = await res.json();  // JSON 변환이 끝날 때까지 기다림
// 이 아래 코드는 posts가 다 채워진 뒤에 실행됨
```

async = "이 함수는 내부에서 기다리는 구간이 있을 수 있어"라고 선언하는 것
await = 브라우저 전체를 멈추는 게 아니라, 이 함수 실행만 데이터가 올 때까지 일시정지. 브라우저는 다른 일을 계속 함

실제 코드:

```tsx
// app/posts/page.tsx — Server Component
import Link from "next/link";

// interface = "이 객체는 이런 모양이다"라고 TypeScript에 미리 알려주는 것
// API에서 받아오는 데이터가 어떤 필드를 갖는지 정의한다
// 실행되는 코드가 아니라 "설계도"이다 — 빌드 후에는 사라진다
interface Post {
  id: number;    // 숫자 타입
  title: string; // 문자열 타입
  body: string;
}

// async를 붙이면 이 함수 안에서 await 사용 가능
export default async function PostsPage() {
  // 서버에서 직접 API 호출 — 브라우저에는 이 코드가 전달되지 않음
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  const posts: Post[] = await res.json(); // "posts는 Post 배열이다"라고 명시 → 자동완성 지원

  // 데이터가 다 채워진 상태로 렌더링 시작 — isLoading 상태가 필요 없음
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">블로그</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.id}`}      {/* 각 글의 상세 페이지로 이동 */}
              className="block p-4 border rounded-lg hover:bg-gray-50"
            >
              <h2 className="font-bold">{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

서버 컴포넌트에서 fetch하면: (1) API 키가 브라우저에 노출되지 않고, (2) `isLoading` state 없이도 로딩 처리가 되고 (`loading.tsx`가 자동으로 처리), (3) 브라우저에 보내는 JavaScript 양이 줄어든다.

---

## 6.5 Context API와 커스텀 훅

### 6.5.1 전역 상태와 Context

Props로 데이터를 전달하면 부모→자식→손자로 깊이 내려갈수록 번거로워진다. **Context API**는 컴포넌트 트리 전체에 데이터를 "방송"한다.

**실제 쓰는 경우 3가지**:
1. 로그인한 사용자 정보 (헤더, 사이드바, 마이페이지 등 모든 곳에서 필요)
2. 다크모드 설정 (아래 ThemeContext 예시)
3. 장바구니 등 앱 전체에서 공유하는 상태

즉, **"여러 컴포넌트가 같은 데이터를 봐야 하는데, props로 내려보내기 귀찮을 때"** 쓴다.

```tsx
// lib/ThemeContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

interface ThemeContextType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

// 공유할 데이터의 저장소를 만들어둠 (처음엔 비어있음)
const ThemeContext = createContext<ThemeContextType | null>(null);

// 이 Provider로 감싼 컴포넌트들은 isDark/setIsDark에 접근할 수 있음
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false); // 다크모드 여부

  return (
    // value에 넣은 값이 하위 모든 컴포넌트에 방송됨
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children} {/* ThemeProvider로 감싼 자식들 */}
    </ThemeContext.Provider>
  );
}

// 어느 컴포넌트에서든 이 훅을 호출하면 isDark/setIsDark를 꺼내쓸 수 있음
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext); // Context에서 현재 값을 가져옴
  if (!context) {
    // ThemeProvider 바깥에서 호출하면 context가 null → 에러로 알려줌
    throw new Error("useTheme은 ThemeProvider 안에서 사용해야 합니다");
  }
  return context;
}
```

사용 방법:

```tsx
// app/layout.tsx — Provider로 감싸기
// 모든 페이지가 layout.tsx 안에 있으므로, 여기서 감싸면 전체에 방송됨
import { ThemeProvider } from "@/lib/ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider>   {/* 이 안의 모든 컴포넌트는 isDark에 접근 가능 */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// components/ThemeToggle.tsx — 어디서든 useTheme()으로 꺼내 쓰면 됨
"use client";
import { useTheme } from "@/lib/ThemeContext";

export default function ThemeToggle() {
  const { isDark, setIsDark } = useTheme(); // props 없이도 isDark를 꺼낼 수 있음
  return (
    <button onClick={() => setIsDark(!isDark)}> {/* 클릭하면 true↔false 토글 */}
      {isDark ? "다크" : "라이트"}              {/* 현재 상태에 따라 텍스트 변경 */}
    </button>
  );
}
```

### 6.5.2 커스텀 훅으로 로직 재사용

**커스텀 훅**(Custom Hook)은 상태 로직을 함수로 추출하여 여러 컴포넌트에서 재사용하는 패턴이다. 이름은 반드시 `use`로 시작한다.

**실제 쓰는 경우 3가지**:
1. API 호출 + 로딩/에러 상태 세트 (여러 페이지에서 같은 패턴 반복될 때)
2. 폼 입력값 관리 로직 (제목, 내용, 유효성 검사를 묶어서)
3. 로컬 스토리지 읽기/쓰기 (다크모드 설정 저장 등)

즉, **"같은 useState + useEffect 조합을 여러 컴포넌트에서 쓸 때"** 하나의 훅으로 추출한다.

```tsx
// hooks/usePosts.ts
"use client";

import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);           // 게시글 목록
  const [isLoading, setIsLoading] = useState<boolean>(true); // 처음엔 로딩 중
  const [error, setError] = useState<string | null>(null);   // 에러 메시지

  useEffect(() => {
    // 컴포넌트가 화면에 나타날 때 1회 실행
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => res.json())                         // 응답 → JSON 변환
      .then((data: Post[]) => setPosts(data))            // 게시글 목록 저장
      .catch((err: Error) => setError(err.message))      // 에러 메시지 저장
      .finally(() => setIsLoading(false));               // 성공/실패 무관 로딩 종료
  }, []); // [] = 처음 한 번만 실행

  // 이 세 값을 묶어서 반환 → 쓰는 쪽에서 구조분해로 꺼내 씀
  return { posts, isLoading, error };
}

// 사용하는 컴포넌트 — 훅 덕분에 3줄로 끝남
function PostList() {
  const { posts, isLoading, error } = usePosts(); // 훅에서 3가지 값 꺼내기
  // ...
}
```

---

## 전체 검증 + 배포

**목표**: AI 코드를 검증하고 배포한다.

### 전체 흐름 테스트

아래 시나리오를 순서대로 따라가며 확인한다:

1. `/posts` → 게시글 목록(더미 또는 JSONPlaceholder)이 보이는가?
2. 검색창에 입력 → 실시간으로 목록이 필터링되는가?
3. 게시글 카드 클릭 → `/posts/[id]` 상세 페이지로 이동하는가?
4. "새 글 쓰기" → `/posts/new` 폼 접속, 제목 없이 제출 → 경고 표시
5. 제목/내용 입력 후 제출 → alert 표시 후 `/posts`로 이동하는가?
6. 게시글 삭제 버튼 → 확인 창 → 목록에서 사라지는가?

### 검증 체크리스트

- [ ] `"use client"`가 SearchBar 등 인터랙티브 컴포넌트에만 있는가?
- [ ] 상태 업데이트 시 `push/splice` 없이 `filter/map/spread` 를 사용하는가?
- [ ] `useEffect` 사용 시 의존성 배열이 올바르게 설정됐는가?
- [ ] 이벤트 핸들러가 `onClick={handleClick}` (참조) 이고 `onClick={handleClick()}` (즉시 실행)이 아닌가?

### 🤖 배포

Copilot Chat(Agent 모드):

> "터미널에서 git add, commit, push를 실행해줘. 커밋 메시지: 'Ch6: 상태 관리와 데이터 페칭'"

배포 후 확인:

- [ ] Vercel 대시보드에서 배포 완료를 확인했는가?
- [ ] 배포된 URL에서 검색, 작성, 삭제가 모두 동작하는가?
- [ ] 모바일에서도 레이아웃이 정상인가?

---

## 핵심 정리

1. **useState**로 상태를 관리하고, **이벤트 핸들러**로 사용자 동작에 반응한다. 상태 업데이트 시 **불변성**을 유지한다 (push 대신 스프레드/filter/map)
2. **Server Component**(기본)는 서버에서 `async/await`로 데이터를 가져오고, **Client Component**(`"use client"`)는 브라우저에서 `useState`/`useEffect`를 사용한다
3. **Context API**는 트리 전체에 데이터를 공유하고, **커스텀 훅**(`use` 접두사)으로 로직을 재사용한다

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch6 과제"에 아래 **스크린샷 2장**을 제출한다.

**캡처 방법**: 브라우저 화면을 캡처한다. (Mac: `Cmd + Shift + 4`)

```
① 검색 기능 동작 화면
   - 검색창에 단어(예: "React")를 입력한 상태
   - 필터링된 결과가 화면에 보이는 상태

② 삭제 기능 동작 화면
   - 삭제 버튼 클릭 후 해당 게시글이 목록에서 사라진 상태
```
