import { useState } from 'react'

export default function InputBar({ onSend, isLoading }) {
  const [value, setValue] = useState('')

  const sendMessage = () => {
    const trimmed = value.trim()

    if (!trimmed || isLoading) return

    onSend(trimmed)
    setValue('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage()
  }

  const handleKeyDown = (event) => {
    // Enter sends the message
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="border-t-2 border-ledger-ink bg-ledger-paper px-5 py-4 sm:px-8">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-3xl items-end gap-3"
      >
        <label htmlFor="question" className="sr-only">
          Ask a question
        </label>

        <textarea
          id="question"
          rows={1}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Ask a question about TN engineering colleges…"
          className="min-h-[44px] flex-1 resize-none border border-ledger-rule bg-white/60 px-3 py-2 font-serif text-sm text-ledger-ink placeholder:text-ledger-ink/40 focus:border-ledger-brass focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={!value.trim() || isLoading}
          className="h-11 shrink-0 border border-ledger-ink bg-ledger-ink px-4 font-serif text-sm text-ledger-paper transition-colors disabled:cursor-not-allowed disabled:border-ledger-rule disabled:bg-transparent disabled:text-ledger-ink/30"
        >
          {isLoading ? 'Searching...' : 'Ask'}
        </button>
      </form>
    </div>
  )
}