import { useState } from 'react'
import {
  Bot,
  Plus,
  MessageSquare,
  PanelLeftClose,
  User,
  MoreHorizontal,
  Pencil,
  Trash2,
  BookOpen,
  Search,
  Pin,
  PinOff,
  X,
  MapPin,
  GraduationCap,
} from 'lucide-react'

export default function Sidebar({
  chats,
  activeChatId,
  sidebarOpen,
  onNewChat,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
  onPinChat,
  onOpen,
  onClose,
}) {
  const [activeSection, setActiveSection] = useState('chats')
  const [openMenuId, setOpenMenuId] = useState(null)
  const [editingChatId, setEditingChatId] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [searchText, setSearchText] = useState('')
  const [showProfile, setShowProfile] = useState(false)

  const startRename = (chat) => {
    setEditingChatId(chat.id)
    setNewTitle(chat.title)
    setOpenMenuId(null)
  }

  const saveRename = (chatId) => {
    if (newTitle.trim()) {
      onRenameChat(chatId, newTitle.trim())
    }

    setEditingChatId(null)
    setNewTitle('')
  }

  const openSection = (section) => {
    setActiveSection(section)
    onOpen()
  }

 const filteredChats = chats.filter((chat) => {
  const query = searchText.trim().toLowerCase()

  if (!query) return true

  // Search chat title
  if (chat.title?.toLowerCase().includes(query)) {
    return true
  }

  // Search all messages inside the chat
  return chat.messages?.some((message) =>
    message.text?.toLowerCase().includes(query),
  )
})

  const pinnedChats = chats.filter((chat) => chat.pinned)

  const renderChat = (chat) => {
    return (
      <div
        key={chat.id}
        className={`group relative flex items-center rounded-lg ${
          activeChatId === chat.id
            ? 'bg-white/30'
            : 'hover:bg-white/20'
        }`}
      >
        {editingChatId === chat.id ? (
          <input
            autoFocus
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                saveRename(chat.id)
              }

              if (event.key === 'Escape') {
                setEditingChatId(null)
              }
            }}
            onBlur={() => saveRename(chat.id)}
            className="w-full bg-transparent px-3 py-3 text-sm outline-none"
          />
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                onSelectChat(chat)
                setOpenMenuId(null)
              }}
              className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left text-sm text-ledger-ink/70"
            >
              <MessageSquare
                size={16}
                className="shrink-0"
              />

              <span className="truncate">
                {chat.title}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setOpenMenuId(
                  openMenuId === chat.id
                    ? null
                    : chat.id,
                )
              }}
              className="mr-2 rounded-md p-1.5 text-ledger-ink/40 hover:bg-white/40 hover:text-ledger-ink"
              title="Chat options"
            >
              <MoreHorizontal size={17} />
            </button>
          </>
        )}

        {openMenuId === chat.id && (
          <div className="absolute right-2 top-11 z-50 w-40 rounded-lg border border-ledger-rule bg-ledger-paper py-1 shadow-lg">

            <button
              type="button"
              onClick={() => startRename(chat)}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-white/30"
            >
              <Pencil size={15} />
              Rename
            </button>

            <button
              type="button"
              onClick={() => {
                onPinChat(chat.id)
                setOpenMenuId(null)
              }}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-white/30"
            >
              {chat.pinned ? (
                <>
                  <PinOff size={15} />
                  Unpin
                </>
              ) : (
                <>
                  <Pin size={15} />
                  Pin chat
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                onDeleteChat(chat.id)
                setOpenMenuId(null)
              }}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-red-500 hover:bg-white/30"
            >
              <Trash2 size={15} />
              Delete
            </button>

          </div>
        )}
      </div>
    )
  }

  if (!sidebarOpen) {
    return (
      <>
        <aside className="flex h-screen w-16 shrink-0 flex-col items-center border-r border-ledger-rule bg-ledger-paper py-3">

          <button
            type="button"
            onClick={() => openSection('chats')}
            className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg text-ledger-ink hover:bg-white/30"
            title="Open sidebar"
          >
            <Bot size={23} />
          </button>

          <button
            type="button"
            onClick={onNewChat}
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-ledger-ink/70 hover:bg-white/30"
            title="New Chat"
          >
            <Pencil size={20} />
          </button>

          <button
            type="button"
            onClick={() => openSection('explore')}
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-ledger-ink/70 hover:bg-white/30"
            title="Explore"
          >
            <BookOpen size={20} />
          </button>

          <button
            type="button"
            onClick={() => openSection('search')}
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-ledger-ink/70 hover:bg-white/30"
            title="Search"
          >
            <Search size={20} />
          </button>

          <button
            type="button"
            onClick={() => openSection('pinned')}
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-ledger-ink/70 hover:bg-white/30"
            title="Pinned Chats"
          >
            <Pin size={20} />
          </button>

          <button
            type="button"
            onClick={() => openSection('chats')}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ledger-ink/70 hover:bg-white/30"
            title="Chats"
          >
            <MessageSquare size={20} />
          </button>

          <button
            type="button"
            onClick={() => setShowProfile(true)}
            className="mt-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-ledger-rule text-ledger-ink hover:bg-white/30"
            title="Your Profile"
          >
            <User size={18} />
          </button>

        </aside>

        {showProfile && (
          <ProfileModal
            chats={chats}
            onClose={() => setShowProfile(false)}
          />
        )}
      </>
    )
  }

  return (
    <>
      <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-ledger-rule bg-ledger-paper">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-ledger-rule px-5 py-5">

          <div>
            <h2 className="font-serif text-lg font-semibold text-ledger-ink">
              TN Colleges
            </h2>

            <p className="mt-1 font-mono text-[10px] text-ledger-ink/40">
              COLLEGE ASSISTANT
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-ledger-ink/50 hover:bg-white/30"
            title="Collapse sidebar"
          >
            <PanelLeftClose size={19} />
          </button>

        </div>

        {/* NEW CHAT */}

        <div className="p-4">

          <button
            type="button"
            onClick={onNewChat}
            className="flex w-full items-center gap-3 rounded-lg border border-ledger-rule px-4 py-3 text-sm text-ledger-ink transition hover:bg-white/30"
          >
            <Plus size={18} />
            New Chat
          </button>

        </div>

        {/* TABS */}

        <div className="flex border-b border-ledger-rule px-3">

          <button
            type="button"
            onClick={() => setActiveSection('chats')}
            className={`px-3 py-3 text-xs ${
              activeSection === 'chats'
                ? 'border-b-2 border-ledger-brass text-ledger-ink'
                : 'text-ledger-ink/40'
            }`}
          >
            Chats
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('search')}
            className={`px-3 py-3 text-xs ${
              activeSection === 'search'
                ? 'border-b-2 border-ledger-brass text-ledger-ink'
                : 'text-ledger-ink/40'
            }`}
          >
            Search
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('pinned')}
            className={`px-3 py-3 text-xs ${
              activeSection === 'pinned'
                ? 'border-b-2 border-ledger-brass text-ledger-ink'
                : 'text-ledger-ink/40'
            }`}
          >
            Pinned
          </button>

        </div>

        {/* CONTENT */}

        <div className="min-h-0 flex-1 overflow-y-auto p-4">

          {activeSection === 'chats' && (
            <>
              <p className="mb-3 font-mono text-xs uppercase text-ledger-ink/40">
                Recent Chats
              </p>

              <div className="space-y-1">
                {chats.map(renderChat)}
              </div>

              {chats.length === 0 && (
                <p className="text-sm text-ledger-ink/40">
                  No chats yet
                </p>
              )}
            </>
          )}

          {activeSection === 'search' && (
            <>
              <p className="mb-3 font-mono text-xs uppercase text-ledger-ink/40">
                Search Chats
              </p>

              <div className="relative mb-4">

                <Search
                  size={16}
                  className="absolute left-3 top-3 text-ledger-ink/40"
                />

                <input
                  autoFocus
                  value={searchText}
                  onChange={(event) =>
                    setSearchText(event.target.value)
                  }
                  placeholder="Search conversations..."
                  className="w-full rounded-lg border border-ledger-rule bg-white/20 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ledger-brass"
                />

              </div>

              <div className="space-y-1">
                {filteredChats.map(renderChat)}
              </div>

              {filteredChats.length === 0 && (
                <p className="text-sm text-ledger-ink/40">
                  No chats found
                </p>
              )}
            </>
          )}

          {activeSection === 'pinned' && (
            <>
              <p className="mb-3 font-mono text-xs uppercase text-ledger-ink/40">
                Pinned Chats
              </p>

              <div className="space-y-1">
                {pinnedChats.map(renderChat)}
              </div>

              {pinnedChats.length === 0 && (
                <p className="text-sm text-ledger-ink/40">
                  No pinned chats yet
                </p>
              )}
            </>
          )}

          {activeSection === 'explore' && (
            <>
              <p className="mb-4 font-mono text-xs uppercase text-ledger-ink/40">
                Explore
              </p>

              <div className="space-y-2">

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg border border-ledger-rule p-4 text-left hover:bg-white/30"
                >
                  <BookOpen size={20} />

                  <div>
                    <p className="text-sm">
                      College Information
                    </p>

                    <p className="text-xs text-ledger-ink/40">
                      Find engineering colleges
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg border border-ledger-rule p-4 text-left hover:bg-white/30"
                >
                  <MapPin size={20} />

                  <div>
                    <p className="text-sm">
                      District Search
                    </p>

                    <p className="text-xs text-ledger-ink/40">
                      Search colleges by district
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg border border-ledger-rule p-4 text-left hover:bg-white/30"
                >
                  <GraduationCap size={20} />

                  <div>
                    <p className="text-sm">
                      Courses
                    </p>

                    <p className="text-xs text-ledger-ink/40">
                      Explore engineering courses
                    </p>
                  </div>
                </button>

              </div>
            </>
          )}

        </div>

        {/* PROFILE */}

        <div className="border-t border-ledger-rule p-4">

          <button
            type="button"
            onClick={() => setShowProfile(true)}
            className="flex w-full items-center gap-3 rounded-lg p-2 transition hover:bg-white/30"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ledger-rule">
              <User
                size={17}
                className="text-ledger-ink"
              />
            </div>

            <div className="text-left">
              <p className="text-sm text-ledger-ink">
                Your Profile
              </p>

              <p className="text-xs text-ledger-ink/40">
                Account Settings
              </p>
            </div>

          </button>

        </div>

      </aside>

      {showProfile && (
        <ProfileModal
          chats={chats}
          onClose={() => setShowProfile(false)}
        />
      )}
    </>
  )
}

function ProfileModal({ chats, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-4">

      <div className="w-full max-w-sm rounded-xl border border-ledger-rule bg-ledger-paper shadow-xl">

        <div className="flex items-center justify-between border-b border-ledger-rule px-5 py-4">

          <h2 className="font-serif text-lg text-ledger-ink">
            Your Profile
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-ledger-ink/50 hover:bg-white/30 hover:text-ledger-ink"
          >
            <X size={20} />
          </button>

        </div>

        <div className="p-6 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-ledger-rule">
            <User
              size={28}
              className="text-ledger-ink"
            />
          </div>

          <h3 className="mt-4 font-serif text-xl text-ledger-ink">
            Your Profile
          </h3>

          <p className="mt-1 text-sm text-ledger-ink/40">
            TN Colleges Assistant
          </p>

          <div className="mt-6 border-t border-ledger-rule pt-4">

            <div className="flex justify-between">

              <span className="text-sm text-ledger-ink/50">
                Total Chats
              </span>

              <span className="font-semibold text-ledger-ink">
                {chats.length}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}