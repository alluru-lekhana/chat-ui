import MessageBubble from './MessageBubble.jsx'

export default function MessageArea({ messages }) {
  const hasMessages = messages.length > 0

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col px-5 sm:px-8">
      {hasMessages ? (
        <div className="flex flex-col py-6">
          {messages.map((m, i) => (
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
