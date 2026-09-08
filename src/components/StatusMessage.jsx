export default function StatusMessage({ type, message }) {
  if (!message) return null

  const isNoResults = type === 'no-results'

  return (
    <div className="flex justify-start py-3">
      <div
        className={`max-w-[80%] border-l-2 pl-4 ${
          isNoResults
            ? 'border-ledger-brass'
            : 'border-ledger-ink'
        }`}
      >
        <p className="mb-1 font-mono text-[11px] uppercase text-ledger-ink/50">
          {isNoResults ? 'No Results' : 'Notice'}
        </p>

        <p className="font-serif text-[15px] leading-relaxed text-ledger-ink/70">
          {message}
        </p>
      </div>
    </div>
  )
}