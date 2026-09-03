# TN Colleges — Chat UI

React chat interface for the TN Colleges RAG project. Frontend only — no backend calls yet.

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Day 1 status

Layout shell is in place, no interactivity beyond typing yet:

- `src/App.jsx` — full-height layout: header, scrollable message area, input bar
- `src/components/Header.jsx` — page header
- `src/components/MessageArea.jsx` — message panel with a placeholder empty state (real messages come Day 3)
- `src/components/InputBar.jsx` — text field + send button (controlled input; submit isn't wired to a messages array yet — that's Day 3)

Checked on a 375px-wide viewport as well as desktop widths.

## Next up (per the 4-week schedule)

- Day 2: `MessageBubble` component (user vs. AI styles)
- Day 3: wire `useState` so sending a message appends to a messages array and renders
- Day 4: hardcoded fake AI responses with a delay
- Day 5: responsive polish, empty state refinement, commit
