export default function LoadingIndicator() {
  return (
    <div className="flex justify-start py-2">
      <div>
        <p className="mb-1 font-mono text-[11px] text-ledger-brass">
          Entry
        </p>

        <div className="border-l-2 border-ledger-brass pl-4">
          <p className="font-mono text-sm text-ledger-ink/60">
            Searching college records...
          </p>
        </div>
      </div>
    </div>
  )
}