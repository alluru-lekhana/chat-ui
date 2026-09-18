import ReactMarkdown from 'react-markdown'
import SourceReferences from './SourceReferences.jsx'
import ResponseActions from './ResponseActions.jsx'

export default function MessageBubble({
  role,
  text,
  sources = [],
  onRegenerate,
}) {
  const isUser = role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end py-2">
        <div className="max-w-[80%] sm:max-w-[65%]">
          <p className="mb-1 text-right font-mono text-[11px] text-ledger-ink/40">
            Query
          </p>

          <div className="border border-ledger-rule bg-white/70 px-4 py-2.5">
            <p className="font-serif text-[15px] leading-relaxed text-ledger-ink">
              {text}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start py-2">
      <div className="max-w-[80%] sm:max-w-[65%]">
        <p className="mb-1 font-mono text-[11px] text-ledger-brass">
          Entry
        </p>

        <div className="border-l-2 border-ledger-brass pl-4">
          <div className="font-serif text-[15px] leading-relaxed text-ledger-ink">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-3 last:mb-0">
                    {children}
                  </p>
                ),

                strong: ({ children }) => (
                  <strong className="font-bold">
                    {children}
                  </strong>
                ),

                h1: ({ children }) => (
                  <h1 className="mb-3 text-lg font-bold">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="mb-3 text-base font-bold">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mb-2 font-bold">
                    {children}
                  </h3>
                ),

                ul: ({ children }) => (
                  <ul className="mb-3 ml-5 list-disc space-y-1">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-3 ml-5 list-decimal space-y-1">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li>{children}</li>
                ),

                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {text}
            </ReactMarkdown>
          </div>

          <SourceReferences sources={sources} />

          <ResponseActions
            text={text}
            onRegenerate={onRegenerate}
          />
        </div>
      </div>
    </div>
  )
}