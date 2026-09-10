import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import MessageArea from './components/MessageArea.jsx'
import InputBar from './components/InputBar.jsx'
import { sendMessage } from './services/chatService.js'

export default function App() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  // Send a new question
  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return

    setMessages((prev) => [
      ...prev,
      { role: 'user', text },
    ])

    setIsLoading(true)

    try {
      const response = await sendMessage(text)

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: response.answer,
          sources: response.sources,
          status: response.status,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Regenerate an AI response
  const handleRegenerate = async (messageIndex) => {
    if (isLoading) return

    const previousUserMessage = messages
      .slice(0, messageIndex)
      .reverse()
      .find((message) => message.role === 'user')

    if (!previousUserMessage) return

    setIsLoading(true)

    try {
      const response = await sendMessage(previousUserMessage.text)

      setMessages((prev) =>
        prev.map((message, index) =>
          index === messageIndex
            ? {
                ...message,
                text: response.answer,
                sources: response.sources,
                status: response.status,
              }
            : message,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-ledger-paper">
      <Header />

      <main
        ref={chatRef}
        className="min-h-0 flex-1 overflow-y-auto"
      >
        <MessageArea
          messages={messages}
          onQuestionClick={handleSend}
          onRegenerate={handleRegenerate}
          isLoading={isLoading}
        />
      </main>

      <InputBar
        onSend={handleSend}
        isLoading={isLoading}
      />
    </div>
  )
}