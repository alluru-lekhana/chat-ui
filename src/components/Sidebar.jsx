import { useEffect, useRef, useState } from 'react'
import { supabase } from '../services/supabase.js'
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
  Settings,
  LogOut,
  Shield,
  Download,
} from 'lucide-react'

export default function Sidebar({
  user,
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
  onSignOut,
}) {
  const [activeSection, setActiveSection] = useState('chats')
  const [openMenuId, setOpenMenuId] = useState(null)
  const [editingChatId, setEditingChatId] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [searchText, setSearchText] = useState('')
  const [showProfile, setShowProfile] = useState(false)
  const [showAccountSettings, setShowAccountSettings] = useState(false)
  const menuRef = useRef(null)
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setOpenMenuId(null)
    }
  }

  document.addEventListener(
    'mousedown',
    handleClickOutside,
  )

  return () => {
    document.removeEventListener(
      'mousedown',
      handleClickOutside,
    )
  }
}, [])

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

    if (chat.title?.toLowerCase().includes(query)) {
      return true
    }

    return chat.messages?.some((message) =>
      message.text?.toLowerCase().includes(query),
    )
  })

  const pinnedChats = chats.filter((chat) => chat.pinned)

  const renderChat = (chat) => {
    return (
      <div
  key={chat.id}
  ref={
    openMenuId === chat.id
      ? menuRef
      : null
  }
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
    user={user}
    onClose={() => setShowProfile(false)}
    onOpenAccountSettings={() => {
      setShowProfile(false)
      setShowAccountSettings(true)
    }}
    onSignOut={onSignOut}
  />
)}

{showAccountSettings && (
  <AccountSettingsModal
    user={user}
    onClose={() => setShowAccountSettings(false)}
    onSignOut={onSignOut}
  />
)}
      </>
    )
  }

  return (
    <>
      <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-ledger-rule bg-ledger-paper">

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
    user={user}
    onClose={() => setShowProfile(false)}
    onOpenAccountSettings={() => {
      setShowProfile(false)
      setShowAccountSettings(true)
    }}
    onSignOut={onSignOut}
  />
)}

{showAccountSettings && (
  <AccountSettingsModal
    user={user}
    onClose={() => setShowAccountSettings(false)}
    onSignOut={onSignOut}
  />
)}
    </>
  )
}

function ProfileModal({
  user,
  onClose,
  onOpenAccountSettings,
  onSignOut,
}) {
  const handleSignOut = () => {
    onClose()
    onSignOut()
  }

  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    'Your Profile'

  const email = user?.email || ''

  const avatar =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-ledger-rule bg-ledger-paper shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-ledger-rule">
            {avatar ? (
              <img
                src={avatar}
                alt={fullName}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                  event.currentTarget.nextElementSibling.style.display = 'flex'
                }}
              />
            ) : null}

            <div
              className={`h-full w-full items-center justify-center ${
                avatar ? 'hidden' : 'flex'
              }`}
            >
              <User
                size={28}
                className="text-ledger-ink"
              />
            </div>
          </div>

          <h3 className="mt-4 font-serif text-xl text-ledger-ink">
            {fullName}
          </h3>

          <p className="mt-1 text-sm text-ledger-ink/40">
            {email}
          </p>
        </div>

        <div className="border-t border-ledger-rule p-4">
          <button
            type="button"
            onClick={onOpenAccountSettings}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-ledger-ink transition hover:bg-white/30"
          >
            <Settings size={18} />
            Account Settings
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-red-500 transition hover:bg-white/30"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
function AccountSettingsModal({
  user,
  onClose,
  onSignOut,
}) {
  const [confirmAction, setConfirmAction] = useState(null)
  const [isWorking, setIsWorking] = useState(false)

  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    'Your Profile'

  const email = user?.email || ''

  const avatar =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture
  const handleDeleteAccount = async () => {
  if (isWorking) return

  setIsWorking(true)

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    console.log('SESSION:', session)
    console.log('ACCESS TOKEN:', session?.access_token)

    if (!session?.access_token) {
      throw new Error('Your login session has expired. Please sign in again.')
    }

    const { data, error } =
      await supabase.functions.invoke(
        'delete-account',
        {
          body: {},
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      )

    if (error) {
      let details = ''

      try {
        const responseBody =
          await error.context?.json()

        details =
          responseBody?.error ||
          responseBody?.message ||
          ''
      } catch {
        // Ignore response parsing errors
      }

      throw new Error(
        details || error.message || 'Account deletion failed.',
      )
    }

    console.log('Delete account response:', data)

    setConfirmAction(null)
onClose()

try {
  await supabase.auth.signOut({ scope: 'local' })
} catch (signOutError) {
  console.warn(
    'Session already invalid after account deletion:',
    signOutError,
  )
}

window.location.reload()
  } catch (error) {
    console.error(
      'Failed to delete account:',
      error,
    )

    alert(
      `Unable to delete account: ${
        error.message || 'Unknown error'
      }`,
    )

    setIsWorking(false)
  }
}
  const handleClearAllChats = async () => {
  if (isWorking) return

  setIsWorking(true)

  const { error } = await supabase
    .from('chats')
    .delete()
    .eq('user_id', user?.id)

  if (error) {
    console.error('Clear chat history error:', error)
    alert(`Unable to clear chat history: ${error.message}`)
    setIsWorking(false)
    return
  }

  setConfirmAction(null)
  window.location.reload()
}

  const handleExportChats = async () => {
    if (isWorking || !user?.id) return

    setIsWorking(true)

    try {
      const { data: chats, error } = await supabase
        .from('chats')
        .select('id, title, messages, pinned, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      if (!chats?.length) {
        alert('There are no chats to export.')
        return
      }

      const exportData = {
        exportedAt: new Date().toISOString(),
        account: {
          name: fullName,
          email,
        },
        chats,
      }

      const blob = new Blob(
        [JSON.stringify(exportData, null, 2)],
        { type: 'application/json' },
      )

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'tn-colleges-chat-history.json'
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export chat history:', error)
      alert('Unable to export chat history. Please try again.')
    } finally {
      setIsWorking(false)
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/30 px-4"
        onClick={onClose}
      >
        <div
          className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-xl border border-ledger-rule bg-ledger-paper shadow-xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-ledger-rule px-5 py-4">
            <h2 className="font-serif text-xl text-ledger-ink">
              Account Settings
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1 text-ledger-ink/50 hover:bg-white/30 hover:text-ledger-ink"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-5">
            <section className="mb-7">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-ledger-ink/40">
                Account
              </p>

              <div className="rounded-lg border border-ledger-rule p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ledger-rule">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={fullName}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User
                        size={22}
                        className="text-ledger-ink"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ledger-ink">
                      {fullName}
                    </p>

                    <p className="mt-1 truncate text-xs text-ledger-ink/50">
                      {email}
                    </p>

                    <p className="mt-2 text-xs text-ledger-ink/40">
                      Signed in with Google
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-7">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-ledger-ink/40">
                Chat & Data
              </p>

              <div className="overflow-hidden rounded-lg border border-ledger-rule">
                <button
                  type="button"
                  onClick={() => setConfirmAction('clearChats')}
                  className="flex w-full items-center justify-between border-b border-ledger-rule px-4 py-4 text-left transition hover:bg-white/30"
                >
                  <div>
                    <p className="text-sm text-ledger-ink">
                      Clear All Chat History
                    </p>
                    <p className="mt-1 text-xs text-ledger-ink/45">
                      Permanently delete all your chats
                    </p>
                  </div>

                  <Trash2
                    size={18}
                    className="text-red-500"
                  />
                </button>

                <button
                  type="button"
                  onClick={handleExportChats}
                  className="flex w-full items-center justify-between px-4 py-4 text-left transition hover:bg-white/30"
                >
                  <div>
                    <p className="text-sm text-ledger-ink">
                      Export Chat History
                    </p>
                    <p className="mt-1 text-xs text-ledger-ink/45">
                      Download a copy of your chats
                    </p>
                  </div>

                  <Download
                    size={18}
                    className="text-ledger-brass"
                  />
                </button>
              </div>
            </section>

            <section>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-ledger-ink/40">
                Privacy & Security
              </p>

              <div className="mb-4 rounded-lg border border-ledger-rule p-4">
                <div className="flex items-start gap-3">
                  <Shield
                    size={19}
                    className="mt-0.5 shrink-0 text-ledger-brass"
                  />

                  <div>
                    <p className="text-sm text-ledger-ink">
                      Your chats are private
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-ledger-ink/50">
                      Your chat history is stored securely in your
                      Supabase account. Other users cannot
                      access your chats.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setConfirmAction('deleteAccount')}
                className="flex w-full items-center justify-between rounded-lg border border-red-200 px-4 py-4 text-left transition hover:bg-red-50"
              >
                <div>
                  <p className="text-sm text-red-500">
                    Delete Account
                  </p>

                  <p className="mt-1 text-xs text-ledger-ink/45">
                    Permanently delete your account and data
                  </p>
                </div>

                <Trash2
                  size={18}
                  className="text-red-500"
                />
              </button>
            </section>
          </div>
        </div>
      </div>

      {confirmAction && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 px-4"
          onClick={() => !isWorking && setConfirmAction(null)}
        >
          <div
            className="w-full max-w-sm rounded-xl border border-ledger-rule bg-ledger-paper p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="font-serif text-lg text-ledger-ink">
              {confirmAction === 'clearChats'
                ? 'Clear all chat history?'
                : 'Delete your account?'}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-ledger-ink/55">
              {confirmAction === 'clearChats'
                ? 'This will permanently delete all of your chat history from your Supabase account. This cannot be undone.'
                : 'This will permanently delete your account and all associated data. This action cannot be undone.'}
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                disabled={isWorking}
                onClick={() => setConfirmAction(null)}
                className="rounded-lg border border-ledger-rule px-4 py-2.5 text-sm text-ledger-ink hover:bg-white/30 disabled:opacity-50"
              >
                Cancel
              </button>

              {confirmAction === 'clearChats' ? (
  <button
    type="button"
    disabled={isWorking}
    onClick={handleClearAllChats}
    className="rounded-lg bg-red-500 px-4 py-2.5 text-sm text-white hover:bg-red-600 disabled:opacity-50"
  >
    {isWorking ? 'Clearing...' : 'Clear Chats'}
  </button>
) : (
  <button
    type="button"
    disabled={isWorking}
    onClick={handleDeleteAccount}
    className="rounded-lg bg-red-500 px-4 py-2.5 text-sm text-white hover:bg-red-600 disabled:opacity-50"
  >
    {isWorking ? 'Deleting...' : 'Delete Account'}
  </button>
)}
            </div>
          </div>
        </div>
      )}
    </>
  )
}