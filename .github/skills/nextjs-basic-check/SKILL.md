# Next.js Basic Check

- App Router(app/) 폴더 구조를 사용하고 있는지 확인한다. pages/ 폴더는 사용 금지.
- Server Component가 기본이다. useState, useEffect, onClick 등을 사용하면 "use client"를 파일 최상단에 추가해야 한다.
- next/router 금지. next/navigation에서 useRouter, usePathname을 import한다.
- 동적 라우트의 params는 Promise이다. `const { id } = await params` 패턴을 사용한다.
- 내부 페이지 이동에는 `<a>` 대신 `<Link>` (next/link)를 사용한다.
