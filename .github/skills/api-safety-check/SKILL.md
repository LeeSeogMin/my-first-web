# API Safety Check

- fetch 호출 후 반드시 `if (!response.ok)` 체크를 포함한다.
- 비동기 호출은 try-catch로 감싸서 에러를 처리한다.
- 에러 발생 시 사용자에게 친화적인 메시지를 표시한다 (기술적 에러 코드 노출 금지).
- async/await 패턴을 사용한다 (.then() 체이닝 금지).
- response.json() 호출을 잊지 않는다 (fetch 응답은 자동 파싱되지 않음).
