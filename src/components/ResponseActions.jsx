import { useState } from 'react'
import {
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  Share,
  RotateCcw,
  MoreHorizontal,
  X,
} from 'lucide-react'

export default function ResponseActions({ text, onRegenerate }) {
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [showMenu, setShowMenu] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleLike = () => {
    setFeedback(feedback === 'like' ? null : 'like')
  }

  const handleDislike = () => {
    setFeedback(feedback === 'dislike' ? null : 'dislike')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TN Colleges Assistant',
          text,
        })
      } catch {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(text)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate()
    }
  }

  const handleMenuCopy = async () => {
    await handleCopy()
    setShowMenu(false)
  }

  return (
    <div className="relative mt-3 flex items-center gap-3 text-ledger-ink/50">
      <button
        type="button"
        onClick={handleCopy}
        title="Copy"
        className="transition hover:text-ledger-brass"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </button>

      <button
        type="button"
        onClick={handleLike}
        title="Like"
        className={
          feedback === 'like'
            ? 'text-ledger-brass'
            : 'transition hover:text-ledger-brass'
        }
      >
        <ThumbsUp size={18} />
      </button>

      <button
        type="button"
        onClick={handleDislike}
        title="Dislike"
        className={
          feedback === 'dislike'
            ? 'text-ledger-brass'
            : 'transition hover:text-ledger-brass'
        }
      >
        <ThumbsDown size={18} />
      </button>

      <button
        type="button"
        onClick={handleShare}
        title="Share"
        className="transition hover:text-ledger-brass"
      >
        <Share size={18} />
      </button>

      <button
        type="button"
        onClick={handleRegenerate}
        title="Regenerate"
        className="transition hover:text-ledger-brass"
      >
        <RotateCcw size={18} />
      </button>

      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        title="More options"
        className="transition hover:text-ledger-brass"
      >
        {showMenu ? <X size={18} /> : <MoreHorizontal size={18} />}
      </button>

      {showMenu && (
        <div className="absolute bottom-8 right-0 z-10 w-36 border border-ledger-rule bg-white py-1 text-sm text-ledger-ink shadow-lg">
          <button
            type="button"
            onClick={handleMenuCopy}
            className="w-full px-3 py-2 text-left hover:bg-ledger-paper"
          >
            Copy response
          </button>

          <button
            type="button"
            onClick={() => {
              setShowMenu(false)
              alert('Response saved!')
            }}
            className="w-full px-3 py-2 text-left hover:bg-ledger-paper"
          >
            Save response
          </button>
        </div>
      )}
    </div>
  )
}