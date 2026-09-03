export default function Header() {
  return (
    <header className="border-b-2 border-ledger-ink bg-ledger-paper px-5 py-4 sm:px-8 sm:py-5">
      <div className="mx-auto flex max-w-3xl items-baseline justify-between gap-4">
        <div>
          <h1 className="font-serif text-xl font-semibold tracking-tight text-ledger-ink sm:text-2xl">
            The College Register
          </h1>
          <p className="mt-0.5 font-serif text-sm text-ledger-ink/70">
            Engineering admissions across Tamil Nadu, by district and by seat.
          </p>
        </div>
        <span className="hidden shrink-0 font-mono text-xs text-ledger-brass sm:block">
          Register No. TN‑ENG
        </span>
      </div>
    </header>
  )
}
