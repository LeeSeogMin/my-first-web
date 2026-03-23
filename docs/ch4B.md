# Chapter 4. JavaScript 핵심 — B회차: 실습

> **미션**: 더미 API에서 데이터를 가져와 필터/검색 기능이 있는 블로그를 구현하고 배포한다

---

## 과제 스펙



**더미 API 연동 블로그**를 만든다:

① JSONPlaceholder API(`https://jsonplaceholder.typicode.com/posts`)에서 게시글 가져오기
② 가져온 데이터를 카드 형태로 화면에 표시
③ userId 필터 버튼 — 클릭하면 해당 사용자의 글만 표시
④ 제목 검색 — 키워드 입력 시 제목에 해당 키워드가 포함된 글만 표시
⑤ Vercel 배포


---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot Chat에 프롬프트를 입력하여 API 연동과 인터랙션을 구현한다. 생성된 코드를 그대로 쓰지 말고, A회차에서 배운 기준으로 반드시 검증한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:
> "API에서 데이터 가져와서 보여줘"

문제: 어떤 API인지, 어떤 패턴(async/await vs .then)인지, 에러 처리는 필요한지 불명확. AI가 .then() 체이닝이나 var를 사용할 수 있다.

✅ 좋은 프롬프트:


> "app/page.tsx를 수정해줘.
> JSONPlaceholder API(https://jsonplaceholder.typicode.com/posts)에서
> 게시글을 가져와서 카드 리스트로 보여줘.
> async/await와 fetch를 사용하고, response.ok 체크와 try-catch 에러 처리도 포함해줘.
> Tailwind CSS로 스타일링해줘.
> Next.js 16 App Router, 'use client' 지시어 포함."


---

## 개인 실습

### 체크포인트 1: API 데이터 가져오기

**목표**: JSONPlaceholder API에서 게시글을 가져와 화면에 표시한다.

① Copilot Chat에 프롬프트를 입력하여 API 연동 코드를 생성한다
② Copilot이 직접 파일을 수정한다 — 변경된 코드를 확인
③ **async/await 확인**: `.then()` 체이닝이 아닌 async/await를 사용했는지 검사한다
④ **response.ok 확인**: fetch 후 `if (!response.ok)` 체크가 있는지 검사한다
⑤ **try-catch 확인**: 에러 처리가 포함되어 있는지 검사한다


### 체크포인트 2: 필터 + 검색 기능

**목표**: userId 필터와 제목 검색 기능을 추가한다.

① 필터 버튼을 추가한다 — "전체", "User 1", "User 2" 등 버튼 클릭 시 해당 userId의 글만 표시
② 검색 input을 추가한다 — 입력한 키워드가 제목에 포함된 글만 표시
③ `filter` 메서드로 필터링 로직을 구현한다
④ 필터와 검색이 동시에 동작하는지 확인한다

Copilot에게 필터 기능을 요청할 때:


> "게시글 목록에 두 가지 필터 기능을 추가해줘.
> 1. userId 필터: 버튼 클릭으로 해당 사용자 글만 표시 (전체/User 1/User 2 등)
> 2. 제목 검색: input에 키워드 입력 시 제목에 포함된 글만 표시.
> filter 메서드 사용. useState로 상태 관리. Tailwind CSS 스타일링."


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
⑥ 필터 버튼과 검색이 배포 환경에서도 동작하는지 확인한다

---


## 흔한 AI 실수

**표 4.10** Ch4에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 코드 | 발생 원인 |
|---------|-----------|----------|
| `var` 사용 | `const` 또는 `let` | 레거시 학습 데이터 |
| `.then()` 체이닝 | `async/await` | 프로젝트 규칙 미반영 |
| `response.ok` 체크 누락 | `if (!response.ok)` 필수 | HTTP 에러 미처리 |
| `.json()` 누락 | `await response.json()` | fetch 응답 자동 파싱 착각 |
| 존재하지 않는 import 경로 | 실제 파일 경로 확인 | 환각 — 가짜 경로 생성 |
| `==` 비교 연산자 | `===` 사용 (엄격 비교) | 타입 변환 버그 방지 |
| `"use client"` 누락 | useState/이벤트 사용 시 필수 | Server Component 기본 미인지 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch4 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 .then() 체이닝으로 생성했는데,
       async/await로 변환했다."
```

---
