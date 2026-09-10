import { useEffect, useRef, useState } from 'react'
import {
  Copy,
  Check,
  ThumbsUp,
  Share,
  RotateCcw,
  MoreHorizontal,
} from 'lucide-react'

export default function ResponseActions({
  text,
  onRegenerate,
}) {
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      )
    }
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleLike = () => {
    setLiked((prev) => !prev)
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
      await handleCopy()
    }
  }

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate()
    }
  }

  return (
    <div className="mt-4 flex items-center gap-3 text-ledger-ink/50">
      <button
        type="button"
        onClick={handleCopy}
        title="Copy response"
        className="transition hover:text-ledger-brass"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </button>

      <button
        type="button"
        onClick={handleLike}
        title="Helpful"
        className={
          liked
            ? 'text-ledger-brass'
            : 'transition hover:text-ledger-brass'
        }
      >
        <ThumbsUp size={18} />
      </button>

      <button
        type="button"
        onClick={handleShare}
        title="Share response"
        className="transition hover:text-ledger-brass"
      >
        <Share size={18} />
      </button>

      <button
        type="button"
        onClick={handleRegenerate}
        title="Regenerate response"
        className="transition hover:text-ledger-brass"
      >
        <RotateCcw size={18} />
      </button>

      <div
        ref={menuRef}
        className="relative"
      >
        <button
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          title="More options"
          className="transition hover:text-ledger-brass"
        >
          <MoreHorizontal size={18} />
        </button>

        {showMenu && (
          <div className="absolute left-0 top-full z-50 mt-2 w-40 rounded-lg border border-ledger-rule bg-white py-1 text-sm text-ledger-ink shadow-lg">
            <button
              type="button"
              onClick={async () => {
                await handleCopy()
                setShowMenu(false)
              }}
              className="w-full px-3 py-2.5 text-left transition hover:bg-ledger-paper"
            >
              Copy response
            </button>

            <button
              type="button"
              onClick={() => {
                setShowMenu(false)
                alert('Response saved!')
              }}
              className="w-full px-3 py-2.5 text-left transition hover:bg-ledger-paper"
            >
              Save response
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
