# Copilot instructions

Project context Copilot should apply to every session in this repository.

## Stack

- Framework: Astro (static output).
- Language: TypeScript.
- Styling: plain CSS in the base layout.

## Conventions

- Keep components small and focused.
- Prefer semantic HTML and accessible markup.
- Do not close, or add closing keywords for, the exercise walkthrough issue (issue #1) in any pull request. The exercise's GitHub Actions workflows manage that issue. When you open a pull request for app work, link only the specific app work-item issue you are implementing.

## Persistence and hydration rules

- Bookmark persistence uses the browser `localStorage` API; saved state is stored and read only in the client.
- Any browser-only code that touches `localStorage` must run behind a `client:load` boundary (or another client-only Astro directive), so the static server-rendered build never executes browser APIs during SSR.
