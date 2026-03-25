# Chapter 11. Row Level Security (RLS) — B회차: 실습

> **미션**: 블로그에 RLS 정책을 적용하고, 권한 검증을 통과한 뒤 배포한다

---

## 과제 스펙



Ch10에서 완성한 CRUD 블로그에 RLS 정책을 적용하여 데이터베이스 수준 보안을 구현한다:

① posts 테이블 RLS 활성화 + 4대 정책 생성
② profiles 테이블 RLS 적용
③ 다른 계정으로 수정/삭제 차단 테스트
④ GitHub push + Vercel 배포


---

## 바이브코딩 가이드

> **Copilot 활용**: 이번 실습에서는 Copilot Chat에 RLS 정책 SQL을 요청한다. 보안 정책은 한 글자 실수로도 전체 데이터가 노출될 수 있으므로, A회차에서 배운 USING vs WITH CHECK 규칙으로 반드시 검증한다.

### 이번 실습에서 활용할 MCP · Skills

| 도구 | 활용 방법 |
|------|----------|
| **Supabase MCP** | RLS 정책이 올바르게 적용되었는지 Copilot 안에서 직접 확인한다. 다른 사용자 권한 테스트에 활용한다. |
| **secret-guard** | RLS 우회를 방지하기 위해 `service_role` 키가 클라이언트 코드에 없는지 최종 점검한다. |

- Supabase MCP 예시: `posts 테이블의 RLS 정책 목록을 보여줘`
- Supabase MCP 예시: `SELECT * FROM posts WHERE user_id != '현재유저id' 를 실행해서 RLS가 동작하는지 확인해줘`
- Skills 점검 예시: `secret-guard 기준으로 이 프로젝트에서 service_role 키가 클라이언트에 노출된 곳을 찾아줘`

> **주의**: RLS 테스트를 위해 Supabase MCP의 `--read-only`를 해제해야 할 수 있다. 수업 안내에 따라 진행한다.

**좋은 프롬프트 vs 나쁜 프롬프트**:

❌ 나쁜 프롬프트:
> "블로그 보안 만들어줘"

문제: 어떤 테이블에, 어떤 작업에, 어떤 조건으로 정책을 만들지 전혀 명시되지 않았다.

✅ 좋은 프롬프트:


> "Supabase posts 테이블에 RLS 정책 4개를 SQL로 작성해줘:
> 1) SELECT: 누구나 읽기 가능 (USING true)
> 2) INSERT: 로그인한 사용자만 작성 (WITH CHECK auth.uid() = user_id)
> 3) UPDATE: 작성자만 수정 (USING auth.uid() = user_id)
> 4) DELETE: 작성자만 삭제 (USING auth.uid() = user_id)
> ALTER TABLE posts ENABLE ROW LEVEL SECURITY; 도 포함해줘."


---

## 개인 실습

### 체크포인트 1: posts 테이블 RLS 4대 정책

**목표**: posts 테이블에 RLS를 활성화하고 4가지 보안 정책을 생성한다.

**방법 A: 대시보드 SQL Editor** (수동)

① Supabase 대시보드 → SQL Editor를 연다
② posts 테이블 RLS를 활성화한다:

**방법 B: Supabase CLI 마이그레이션** (자동화 — 권장)

```bash
npx supabase migration new add_rls_policies
```

생성된 마이그레이션 파일(`supabase/migrations/YYYYMMDD_add_rls_policies.sql`)에 아래 SQL을 작성한 뒤:

```bash
npx supabase db push
```

CLI 방식의 장점: SQL 파일이 Git으로 버전 관리되어 팀원과 공유할 수 있고, 배포 환경에서 동일한 정책을 재현할 수 있다. 상세 설정 방법은 **부록 D**를 참고한다.

---

**대시보드 방식 상세 절차** (방법 A):

① Supabase 대시보드 → SQL Editor를 연다
② posts 테이블 RLS를 활성화한다:

```sql
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
```

③ 4대 정책을 순서대로 생성한다:

```sql
-- 1) 누구나 읽기
CREATE POLICY "누구나 posts 읽기"
  ON posts FOR SELECT
  USING (true);

-- 2) 로그인한 사용자만 작성
CREATE POLICY "로그인 사용자 posts 작성"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 3) 작성자만 수정
CREATE POLICY "작성자만 posts 수정"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);

-- 4) 작성자만 삭제
CREATE POLICY "작성자만 posts 삭제"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);
```

④ Authentication → Users에서 SQL이 정상 실행되었는지 확인한다
⑤ 앱에서 게시글 목록이 여전히 표시되는지 확인한다 (SELECT 정책 동작 확인)


### 체크포인트 2: profiles 테이블 RLS + 권한 테스트

**목표**: profiles 테이블에도 RLS를 적용하고, 다른 계정으로 권한 테스트를 수행한다.

① profiles 테이블 RLS를 활성화하고 정책을 생성한다:

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 누구나 프로필 읽기
CREATE POLICY "누구나 profiles 읽기"
  ON profiles FOR SELECT
  USING (true);

-- 본인 프로필만 수정
CREATE POLICY "본인 profiles 수정"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

② 테스트용 두 번째 계정을 회원가입으로 만든다
③ 계정 A로 게시글 작성 → 계정 B로 로그인 → 수정/삭제 시도:

**표 11.7** RLS 권한 테스트 시나리오

| 테스트 | 기대 결과 | 확인 |
|--------|-----------|------|
| 계정 B로 계정 A 게시글 읽기 | 정상 표시 | ☐ |
| 계정 B로 새 게시글 작성 | 정상 작성 | ☐ |
| 계정 B로 계정 A 게시글 수정 시도 | 실패 (변경 없음) | ☐ |
| 계정 B로 계정 A 게시글 삭제 시도 | 실패 (삭제 없음) | ☐ |
| 비로그인 상태로 게시글 읽기 | 정상 표시 | ☐ |
| 비로그인 상태로 게시글 작성 시도 | 실패 (에러) | ☐ |

④ UI에서 수정/삭제 버튼이 숨겨져 있더라도, 브라우저 개발자 도구에서 직접 API를 호출해도 차단되는지 확인한다


### 체크포인트 3: 검증 + 배포

**목표**: RLS 정책을 검증하고 배포한다.

① 아래 검증 체크리스트를 수행한다
② 문제가 있으면 SQL Editor에서 정책을 수정한다
③ Copilot Chat(Agent 모드)에 배포 요청:

> **Copilot 프롬프트**
>
> "터미널에서 git add, commit, push를 실행해줘."

④ Vercel 대시보드에서 배포 완료를 확인한다
⑤ 배포된 URL에서 RLS가 정상 동작하는지 확인한다

---


## 흔한 AI 실수

**표 11.9** Ch11에서 AI가 자주 틀리는 패턴

| AI 실수 | 올바른 방법 | 발생 원인 |
|---------|------------|----------|
| RLS 활성화 없이 정책만 생성 | `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` 먼저 실행 | 순서 혼동 |
| INSERT에 `USING` 사용 | INSERT는 `WITH CHECK` 사용 (새 행 검증) | USING vs WITH CHECK 혼동 |
| `auth.uid()` 대신 하드코딩된 UUID | `auth.uid()` 함수로 현재 사용자 확인 | 동적 함수 미인식 |
| 모든 작업을 하나의 정책으로 작성 | 작업별(SELECT/INSERT/UPDATE/DELETE) 개별 정책 | 정책 분리 원칙 미인식 |
| 정책 이름 중복 | 각 정책에 고유한 이름 부여 | 기존 정책 존재 미확인 |
| UPDATE에 WITH CHECK 누락 | UPDATE는 USING + WITH CHECK 모두 필요할 수 있음 | 수정된 행 검증 누락 |

---

## 제출 안내 (Google Classroom)

Google Classroom의 "Ch11 과제"에 아래 두 항목을 제출한다:

```
① 배포 URL
   예: https://내프로젝트.vercel.app

② AI가 틀린 부분 1개
   예: "Copilot이 INSERT 정책에 USING을 사용했는데,
       새 행을 검증하려면 WITH CHECK여야 해서 수정했다."
```

---
