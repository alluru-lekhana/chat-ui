export default function MessageArea() {
  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col px-5 sm:px-8">
      {/* Day 3 will replace this with the real messages array, mapped to
          MessageBubble components (built Day 2). Day 1 is layout only. */}
      <div className="flex flex-1 flex-col items-start justify-center gap-2 py-16">
        <p className="font-serif text-lg text-ledger-ink/60">
          Ask about a district, a course, or a college.
        </p>
        <p className="font-mono text-xs text-ledger-ink/40">
          e.g. "Which colleges in Chennai offer Computer Science Engineering?"
        </p>
      </div>
    </div>
  )
}
