import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Filters from './components/Filters.jsx'
import MessageArea from './components/MessageArea.jsx'
import InputBar from './components/InputBar.jsx'
import { sendMessage } from './services/chatService.js'

const defaultFilters = {
  district: 'All Districts',
  course: 'All Courses',
  collegeType: 'All Types',
}

export default function App() {
  const [messages, setMessages] = useState([])
  const [filters, setFilters] = useState(defaultFilters)
  const [isLoading, setIsLoading] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

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

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-ledger-paper">
      <Header />

      <Filters
        filters={filters}
        onFilterChange={setFilters}
      />

      <main
        ref={chatRef}
        className="min-h-0 flex-1 overflow-y-auto"
      >
        <MessageArea
          messages={messages}
          onQuestionClick={handleSend}
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