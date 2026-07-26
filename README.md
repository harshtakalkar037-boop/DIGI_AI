# DIGI_AI

A chat-interface starter for an AI agent, built with Next.js and TypeScript.
It ships a working chat UI wired up to a backend API route — the API
currently returns mocked replies, ready to be swapped for a real model call.

## Current status

This is an early-stage scaffold:

- ✅ Chat UI (message list, input box, auto-scroll, loading state)
- ✅ `POST /api/chat` route wired up end-to-end
- ⏳ The API route returns a random canned reply — it isn't calling a real
  AI model yet (see [`src/app/api/chat/route.ts`](./src/app/api/chat/route.ts))

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- React 19
- Tailwind CSS

## Project Structure

```
src/app/
├── api/chat/route.ts   # Chat API endpoint (currently returns mock replies)
├── page.tsx             # Chat UI
├── layout.tsx
└── globals.css
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the chat UI.

## Next steps

To make this a real AI agent, replace the mock reply logic in
[`src/app/api/chat/route.ts`](./src/app/api/chat/route.ts) with a call to
an actual model provider (e.g. the OpenAI or Anthropic API), passing through
the `message` from the request body and returning the model's response.

## License

No license specified yet — all rights reserved by default until one is added.
