# Project Context — 민준의 블로그

## 현재 상태
- Ch7 완료: 프론트엔드 기본 구조 + shadcn/ui 도입
- 더미 데이터(lib/posts.ts) 사용 중 → Ch8에서 Supabase로 교체 예정
- 인증 미구현 → Ch9에서 이메일/비밀번호 로그인 추가 예정

## 기술 결정
- Tailwind CSS 4: @theme 블록으로 디자인 토큰 관리 (tailwind.config.js 불필요)
- shadcn/ui: button, card, input 컴포넌트 도입 완료
- Server/Client 분리: SearchBar만 Client Component, 나머지는 Server Component

## 다음 단계
- Ch8: Supabase 프로젝트 생성 + 테이블 생성 + 클라이언트 연결
- Ch9: 이메일/비밀번호 인증
- Ch10: CRUD 완성
