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
              {source.college_name || 'College'}
            </p>

            <p className="mt-1 font-mono text-xs text-ledger-ink/50">
              {source.tnea_code && (
                <>TNEA Code: {source.tnea_code}</>
              )}

              {source.tnea_code && source.district && ' • '}

              {source.district && (
                <>District: {source.district}</>
              )}
            </p>

            {typeof source.score === 'number' && (
              <p className="mt-1 font-mono text-[11px] text-ledger-ink/40">
                Relevance: {(source.score * 100).toFixed(1)}%
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}