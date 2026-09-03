# TN Colleges — Chat UI

React chat interface for the TN Colleges RAG project. Frontend only — no backend calls yet.

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Progress

- **Day 1** — layout shell: `App.jsx` (full-height layout), `Header.jsx`, `MessageArea.jsx`, `InputBar.jsx`
- **Day 2** — `MessageBubble.jsx` component, two styles: user messages (right-aligned "Query") and AI answers (left-aligned "Entry")
- **Day 3** — wired `useState` in `App.jsx`: typing a question and hitting Ask appends it to a messages array, `MessageArea` renders whatever's actually sent, input clears after send
- **Day 4** — `data/fakeResponses.js` holds hardcoded Q&A pairs matching the sample questions; after sending, a fake AI answer appears ~900ms later (that delay is what Day 8's loading indicator will cover)

Checked on a 375px-wide viewport as well as desktop widths.

## Next up (per the 4-week schedule)

- Day 5: responsive polish, empty state refinement, commit
