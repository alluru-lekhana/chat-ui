import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import MessageArea from './components/MessageArea.jsx'
import InputBar from './components/InputBar.jsx'
import { getFakeAnswer } from './data/fakeResponses.js'

const FAKE_RESPONSE_DELAY_MS = 900

export default function App() {
  const [messages, setMessages] = useState([])
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = (text) => {
    if (!text.trim()) return

    setMessages((prev) => [
      ...prev,
      { role: 'user', text }
    ])

    setTimeout(() => {
      const answer = getFakeAnswer(text)

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: answer }
      ])
    }, FAKE_RESPONSE_DELAY_MS)
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
        />
      </main>

      <InputBar onSend={handleSend} />
    </div>
  )
}