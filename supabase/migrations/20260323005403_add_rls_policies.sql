-- =====================
-- posts 테이블 RLS
-- =====================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

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
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4) 작성자만 삭제
CREATE POLICY "작성자만 posts 삭제"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);

-- =====================
-- profiles 테이블 RLS
-- =====================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 누구나 프로필 읽기
CREATE POLICY "누구나 profiles 읽기"
  ON profiles FOR SELECT
  USING (true);

-- 본인 프로필만 수정
CREATE POLICY "본인 profiles 수정"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 트리거로 생성된 프로필 INSERT 허용
CREATE POLICY "profiles insert for trigger"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
