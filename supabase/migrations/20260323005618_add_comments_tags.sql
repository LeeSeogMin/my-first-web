-- comments 테이블
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- tags 테이블
CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

-- post_tags 중간 테이블 (M:N)
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (post_id, tag_id)
);

-- comments RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "누구나 comments 읽기"
  ON comments FOR SELECT USING (true);

CREATE POLICY "로그인 사용자 comments 작성"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "작성자만 comments 삭제"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

-- tags RLS
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "누구나 tags 읽기"
  ON tags FOR SELECT USING (true);

-- post_tags RLS
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "누구나 post_tags 읽기"
  ON post_tags FOR SELECT USING (true);

-- 기본 태그 삽입
INSERT INTO tags (name) VALUES ('Next.js'), ('React'), ('Tailwind'), ('Supabase'), ('AI'), ('일상');
