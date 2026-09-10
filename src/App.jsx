import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import MessageArea from './components/MessageArea.jsx'
import InputBar from './components/InputBar.jsx'
import { sendMessage } from './services/chatService.js'

export default function App() {
  const [messages, setMessages] = useState([])

  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem('tn-college-chats')

    return savedChats
      ? JSON.parse(savedChats)
      : []
  })

  const [activeChatId, setActiveChatId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const chatRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(
      'tn-college-chats',
      JSON.stringify(chats),
    )
  }, [chats])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight
    }
  }, [messages])

  const updateChatMessages = (
    chatId,
    updatedMessages,
  ) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: updatedMessages,
            }
          : chat,
      ),
    )
  }

  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return

    let chatId = activeChatId

    const userMessage = {
      role: 'user',
      text,
    }

    const updatedMessages = [
      ...messages,
      userMessage,
    ]

    if (!chatId) {
      const newChat = {
        id: Date.now(),
        title: text.slice(0, 40),
        messages: updatedMessages,
        pinned: false,
      }

      chatId = newChat.id

      setChats((prev) => [
        newChat,
        ...prev,
      ])

      setActiveChatId(chatId)
    } else {
      updateChatMessages(
        chatId,
        updatedMessages,
      )
    }

    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      const response = await sendMessage(text)

      const assistantMessage = {
        role: 'assistant',
        text: response.answer,
        sources: response.sources,
        status: response.status,
      }

      const finalMessages = [
        ...updatedMessages,
        assistantMessage,
      ]

      setMessages(finalMessages)

      updateChatMessages(
        chatId,
        finalMessages,
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegenerate = async (
    messageIndex,
  ) => {
    if (isLoading) return

    const previousUserMessage = messages
      .slice(0, messageIndex)
      .reverse()
      .find(
        (message) =>
          message.role === 'user',
      )

    if (!previousUserMessage) return

    setIsLoading(true)

    try {
      const response = await sendMessage(
        previousUserMessage.text,
      )

      const updatedMessages = messages.map(
        (message, index) =>
          index === messageIndex
            ? {
                ...message,
                text: response.answer,
                sources: response.sources,
                status: response.status,
              }
            : message,
      )

      setMessages(updatedMessages)

      if (activeChatId) {
        updateChatMessages(
          activeChatId,
          updatedMessages,
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setActiveChatId(null)
    setIsLoading(false)
  }

  const handleSelectChat = (chat) => {
    setMessages(chat.messages || [])
    setActiveChatId(chat.id)
  }

  const handleRenameChat = (
    chatId,
    newTitle,
  ) => {
    if (!newTitle.trim()) return

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title: newTitle,
            }
          : chat,
      ),
    )
  }

  const handleDeleteChat = (chatId) => {
    setChats((prev) =>
      prev.filter(
        (chat) => chat.id !== chatId,
      ),
    )

    if (activeChatId === chatId) {
      setMessages([])
      setActiveChatId(null)
    }
  }

  const handlePinChat = (chatId) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              pinned: !chat.pinned,
            }
          : chat,
      ),
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-ledger-paper">

      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        sidebarOpen={sidebarOpen}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
        onPinChat={handlePinChat}
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">

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

    </div>
  )
}