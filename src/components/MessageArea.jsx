import MessageBubble from './MessageBubble.jsx'

// Day 2 preview data only — just here to check MessageBubble spacing/alignment.
// Day 3 replaces this with the real messages array driven by useState.
const PREVIEW_MESSAGES = [
  { role: 'user', text: 'Which colleges in Chennai offer Computer Science Engineering?' },
  {
    role: 'assistant',
    text: 'Anna University, SSN College of Engineering, and 6 other colleges in Chennai offer CSE. Sources appear below each answer once Week 3 connects the real API.',
  },
]

export default function MessageArea() {
  const hasMessages = PREVIEW_MESSAGES.length > 0

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col px-5 sm:px-8">
      {hasMessages ? (
        <div className="flex flex-col py-6">
          {PREVIEW_MESSAGES.map((m, i) => (
            <MessageBubble key={i} role={m.role} text={m.text} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-start justify-center gap-2 py-16">
          <p className="font-serif text-lg text-ledger-ink/60">
            Ask about a district, a course, or a college.
          </p>
          <p className="font-mono text-xs text-ledger-ink/40">
            e.g. "Which colleges in Chennai offer Computer Science Engineering?"
          </p>
        </div>
      )}
    </div>
  )
}
