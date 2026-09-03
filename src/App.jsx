import { useState } from 'react'
import Header from './components/Header.jsx'
import MessageArea from './components/MessageArea.jsx'
import InputBar from './components/InputBar.jsx'
import { getFakeAnswer } from './data/fakeResponses.js'

// Day 8 replaces this delay with a proper loading/typing indicator.
const FAKE_RESPONSE_DELAY_MS = 900

export default function App() {
  const [messages, setMessages] = useState([])

  const handleSend = (text) => {
    setMessages((prev) => [...prev, { role: 'user', text }])

    setTimeout(() => {
      const answer = getFakeAnswer(text)
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }])
    }, FAKE_RESPONSE_DELAY_MS)
  }

  return (
    <div className="flex h-screen flex-col bg-ledger-paper">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <MessageArea messages={messages} />
      </main>
      <InputBar onSend={handleSend} />
    </div>
  )
}
