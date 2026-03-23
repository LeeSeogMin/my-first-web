# Chapter 1. 첫 배포 — create-next-app에서 Vercel까지 — B회차: 실습

> **미션**: 블로그 첫 페이지를 수정하고 인터넷에 배포한다

---

## 과제 스펙

**오늘 만들 것**:

1. `app/page.tsx` — 블로그 첫 페이지 (이름, 한 줄 소개, Tailwind 스타일)
2. Vercel 배포

A회차에서 만든 프로젝트를 이어서 사용한다.

> **Ch1은 Copilot 설치 전이다.** 코드를 직접 수정하는 방식으로 진행한다.
> Copilot은 2장에서 설치한다.

---

## 바이브코딩 가이드

> **핵심**: AI가 없어도 기본 흐름은 동일하다 — 예시 코드를 보고 내 것으로 바꾼다 → 브라우저에서 확인한다 → 배포한다

**page.tsx 수정 예시**:

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">홍길동</h1>
      <p className="mt-4 text-xl text-gray-600">
        웹 프로그래밍을 배우고 있습니다
      </p>
    </main>
  );
}
```

이름과 자기소개를 바꾸면 된다. `text-4xl`, `text-gray-600` 같은 클래스는 Tailwind CSS이다 (3장에서 자세히 배운다).

**주요 Tailwind 클래스**:

| 클래스                             | 효과             |
| ---------------------------------- | ---------------- |
| `text-4xl`                         | 큰 텍스트 (36px) |
| `font-bold`                        | 굵은 글씨        |
| `text-gray-600`                    | 회색 글씨        |
| `mt-4`                             | 위쪽 여백 16px   |
| `flex items-center justify-center` | 중앙 배치        |

---

## 개인 실습

### 체크포인트 1: page.tsx 수정

**목표**: 블로그 첫 페이지를 본인 이름과 소개로 바꾼다.

① `npm run dev`로 개발 서버를 실행한다
② 브라우저에서 http://localhost:3000 확인
③ `app/page.tsx`를 열고 기본 Next.js 내용을 삭제한다
④ 위 예시 코드를 참고하여 본인 이름, 소개로 수정한다
⑤ 브라우저에서 실시간으로 변경 확인 (저장 시 자동 반영)

### 체크포인트 2: Tailwind로 꾸미기

**목표**: 색상, 크기, 간격으로 보기 좋게 만든다.

① 위 표를 참고하여 클래스를 바꿔가며 변화를 확인한다
② 학교, 전공, 취미 등 정보를 추가한다
③ 저장할 때마다 브라우저에서 즉시 반영되는 것을 확인한다

### 체크포인트 3: git push + Vercel 배포

**목표**: 코드를 GitHub에 올리고 Vercel에서 배포 URL을 확인한다.

① 터미널에서:

```bash
git add .
git commit -m "Ch1: 블로그 첫 페이지"
git push
```

② Vercel 대시보드에서 자동 배포 확인
③ 배포된 URL 확인 + 모바일에서도 접속

> `git push` 인증 오류가 나면 `gh auth login` 실행 (부록 A 참고)

---

## 흔한 실수

- 프로젝트 폴더 밖에서 `npm run dev` 실행 → `cd my-blog`으로 이동 후 실행
- 기본 Next.js 템플릿을 삭제 안 함 → `app/page.tsx` 전체 내용 교체
- `git push` 인증 실패 → `gh auth login` 또는 Personal Access Token 발급

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch1 과제"에 아래 항목을 제출한다:

```
① 배포 URL
  예: https://my-blog-xxxxx.vercel.app
```

> Ch1은 첫 수업이므로 "AI가 틀린 부분" 항목은 없다. 배포 URL만 제출한다.

---
