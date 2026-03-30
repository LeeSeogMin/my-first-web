# Copilot Instructions

## Tech Stack

- Next.js 16.2.1
- React 19.2.4
- Tailwind CSS 4
- TypeScript
- App Router only

## Coding Conventions

- Default to Server Components unless a Client Component is required.
- Use Tailwind CSS for styling.
- Keep components simple and easy to verify.
- Prefer files inside `app/` for routes.

## Known AI Mistakes

- Do not use `next/router`; use `next/navigation` when navigation is needed.
- Do not create `pages/` router files; this project uses the App Router.
- Do not add `"use client"` unless interactivity or browser APIs are actually needed.
- Check installed package versions before suggesting APIs that may have changed.
