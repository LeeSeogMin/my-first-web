# Secret Guard

- API 키를 코드에 직접 하드코딩하지 않는다. 반드시 `.env.local`에서 환경 변수로 관리한다.
- 브라우저에서 사용하는 환경 변수에만 `NEXT_PUBLIC_` 접두사를 붙인다.
- `NEXT_PUBLIC_` 접두사에 민감한 키(service_role, secret 등)를 절대 넣지 않는다.
- `service_role` 키는 서버 사이드에서만 사용하고, 클라이언트 코드에 절대 노출하지 않는다.
- `.env.local`이 `.gitignore`에 포함되어 있는지 반드시 확인한다.
