export default function SourceReferences({ sources = [] }) {
  if (!sources.length) return null

  return (
    <div className="mt-4 border-t border-ledger-rule pt-3">
      <p className="mb-2 font-mono text-xs uppercase tracking-wide text-ledger-ink/50">
        Sources
      </p>

      <div className="flex flex-col gap-2">
        {sources.map((source, index) => (
          <div
            key={index}
            className="rounded border border-ledger-rule bg-white/40 px-3 py-2"
          >
            <p className="font-serif text-sm text-ledger-ink">
              {source.name}
            </p>

            {source.detail && (
              <p className="mt-1 font-mono text-xs text-ledger-ink/50">
                {source.detail}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}