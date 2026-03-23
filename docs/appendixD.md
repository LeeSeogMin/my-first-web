# 부록 D. Supabase CLI 설정 가이드

> **목적**: Supabase CLI로 프로젝트 생성, 스키마 마이그레이션, RLS 정책을 코드로 관리한다.
> **소요 시간**: 약 15분 (최초 1회)

---

## D.1 Supabase CLI란

**Supabase CLI**는 Supabase 프로젝트를 터미널에서 관리하는 도구이다.

대시보드(웹 브라우저)에서 하던 작업을 **명령어 한 줄**로 실행할 수 있다.

**표 D.1** 대시보드 vs CLI 비교

| 작업 | 대시보드 (수동) | CLI (자동화) |
|------|----------------|-------------|
| 프로젝트 생성 | 브라우저에서 클릭 | `supabase projects create` |
| 테이블 생성 | SQL Editor에서 붙여넣기 | `supabase db push` (마이그레이션) |
| RLS 정책 | SQL Editor에서 실행 | 마이그레이션 파일에 SQL 포함 |
| API 키 확인 | Settings → API 페이지 | `supabase projects api-keys` |
| 스키마 변경 추적 | 불가능 (수동 기록) | Git으로 마이그레이션 파일 관리 |

CLI의 가장 큰 장점: **스키마와 RLS 정책을 Git으로 버전 관리**할 수 있다.

---

## D.2 사전 준비

### D.2.1 CLI 설치 확인

`npx`를 사용하면 별도 설치 없이 실행 가능하다:

```bash
npx supabase --version
```

`2.x.x` 형태의 버전이 나오면 성공이다.

### D.2.2 Access Token 발급

CLI가 Supabase 계정에 접근하려면 **Access Token**이 필요하다.

**발급 방법**:

1. https://supabase.com/dashboard/account/tokens 접속
2. **"Generate new token"** 클릭
3. 이름 입력 (예: `my-blog-cli`)
4. 생성된 토큰을 복사한다

> **토큰 형식**: `sbp_` + 영숫자 (예: `sbp_1234abcd5678efgh`)
> **주의**: 토큰은 생성 시 한 번만 표시된다. 반드시 안전한 곳에 저장한다.
> **보안**: 토큰을 코드에 직접 넣지 않는다. `.env.local`에 저장한다.

### D.2.3 토큰 설정

`.env.local`에 토큰을 추가한다:

```bash
# .env.local
SUPABASE_ACCESS_TOKEN=sbp_여기에토큰붙여넣기
```

또는 터미널에서 직접 로그인한다:

```bash
npx supabase login
```

브라우저가 열리고 인증 완료 후 자동 로그인된다.

> **비대화형 환경** (CI/CD, AI 에이전트 등): `--token` 플래그 또는 `SUPABASE_ACCESS_TOKEN` 환경 변수를 사용한다.

---

## D.3 프로젝트 생성 (CLI)

### D.3.1 조직 ID 확인

```bash
npx supabase orgs list
```

출력에서 `ORGANIZATION ID` 열의 값을 복사한다.

### D.3.2 프로젝트 생성

```bash
npx supabase projects create my-blog \
  --org-id "조직ID" \
  --db-password "DB비밀번호" \
  --region ap-northeast-1
```

| 옵션 | 설명 | 권장값 |
|------|------|--------|
| `--org-id` | 조직 ID (D.3.1에서 확인) | 본인 조직 ID |
| `--db-password` | 데이터베이스 비밀번호 | 영숫자 16자 이상 |
| `--region` | 서버 위치 | `ap-northeast-1` (도쿄) |

> **주의**: DB 비밀번호는 나중에 필요할 수 있으므로 안전하게 보관한다.

### D.3.3 프로젝트 링크

생성 후 프로젝트를 로컬 폴더에 연결한다:

```bash
npx supabase link --project-ref "프로젝트참조ID"
```

프로젝트 참조 ID는 `supabase projects list`에서 확인하거나, Supabase URL(`https://xxxx.supabase.co`)의 `xxxx` 부분이다.

### D.3.4 API 키 확인

```bash
npx supabase projects api-keys --project-ref "프로젝트참조ID"
```

출력에서 `anon` 키와 프로젝트 URL을 `.env.local`에 복사한다:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://프로젝트참조ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

---

## D.4 마이그레이션으로 스키마 관리

### D.4.1 마이그레이션 초기화

```bash
npx supabase init
```

`supabase/` 폴더가 생성된다.

### D.4.2 마이그레이션 파일 생성

```bash
npx supabase migration new create_tables
```

`supabase/migrations/YYYYMMDDHHMMSS_create_tables.sql` 파일이 생성된다. 여기에 SQL을 작성한다:

```sql
-- profiles 테이블
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- posts 테이블
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### D.4.3 리모트에 적용

```bash
npx supabase db push
```

마이그레이션 파일의 SQL이 Supabase 프로젝트에 실행된다.

### D.4.4 RLS 정책도 마이그레이션으로

```bash
npx supabase migration new add_rls_policies
```

```sql
-- posts RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "누구나 posts 읽기" ON posts
  FOR SELECT USING (true);

CREATE POLICY "로그인 사용자 posts 작성" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "작성자만 posts 수정" ON posts
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "작성자만 posts 삭제" ON posts
  FOR DELETE USING (auth.uid() = user_id);

-- profiles RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "누구나 profiles 읽기" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "본인 profiles 수정" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

```bash
npx supabase db push
```

### D.4.5 대시보드에서 변경한 내용 캡처

대시보드에서 직접 변경한 경우, CLI로 마이그레이션 파일을 자동 생성할 수 있다:

```bash
npx supabase db diff --use-migra -f capture_dashboard_changes
```

---

## D.5 Supabase MCP 서버

Supabase MCP를 사용하면 **AI 어시스턴트(Copilot, Claude 등) 안에서 직접** Supabase를 조작할 수 있다.

### D.5.1 MCP가 할 수 있는 것

| 기능 | MCP 도구 | 설명 |
|------|---------|------|
| SQL 실행 | `execute_sql` | SELECT, INSERT, DDL 모두 가능 |
| 마이그레이션 적용 | `apply_migration` | SQL 마이그레이션을 리모트에 적용 |
| 프로젝트 생성 | `create_project` | 새 프로젝트 생성 (read-only 모드에서 비활성) |
| 프로젝트 목록 | `list_projects` | 프로젝트 목록 조회 |
| 테이블 조회 | `execute_sql` | 스키마, 데이터 확인 |
| RLS 정책 관리 | `execute_sql` | SQL로 RLS 생성/수정/삭제 |

### D.5.2 설정 방법

`.vscode/mcp.json`에 추가:

```json
{
  "servers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "supabase-mcp-server@latest", "--read-only"],
      "env": {
        "SUPABASE_URL": "${input:supabaseUrl}",
        "SUPABASE_SERVICE_ROLE_KEY": "${input:supabaseServiceRoleKey}"
      }
    }
  }
}
```

> **`--read-only` 모드**: 조회만 가능. 스키마 변경/프로젝트 생성을 하려면 `--read-only`를 제거한다.

### D.5.3 CLI vs MCP 사용 시점

| 상황 | 추천 도구 |
|------|----------|
| 스키마를 Git으로 관리하고 싶다 | **CLI** (마이그레이션 파일) |
| AI와 대화하며 SQL을 실행하고 싶다 | **MCP** |
| CI/CD에서 자동 배포 | **CLI** (`supabase db push`) |
| 빠른 프로토타이핑 | **MCP** 또는 **대시보드** |
| RLS 정책을 코드 리뷰하고 싶다 | **CLI** (마이그레이션 파일 → PR) |

---

## D.6 트러블슈팅

### Access Token 에러

```
Invalid access token format. Must be like `sbp_0102...1920`.
```

→ Access Token은 `sbp_`로 시작한다. DB 비밀번호와 혼동하지 않는다.

### 프로젝트 링크 실패

```
Cannot find project ref
```

→ `supabase projects list`로 정확한 프로젝트 참조 ID를 확인한다.

### db push 실패

```
Error applying migration
```

→ SQL 문법 오류 확인. `supabase db push --dry-run`으로 미리 테스트한다.

---
