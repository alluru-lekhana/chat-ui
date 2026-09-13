function AccountSettingsModal({
  user,
  onClose,
}) {
  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    'Your Profile'

  const email = user?.email || ''

  const avatar =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture

  const handleClearHistory = () => {
    alert('Clear chat history functionality will be added here.')
  }

  const handleExportHistory = () => {
    alert('Export chat history functionality will be added here.')
  }

  const handleDeleteAccount = () => {
    alert('Delete account functionality will be added here.')
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/30 px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-xl border border-ledger-rule bg-ledger-paper shadow-xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* HEADER */}
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

          {/* ACCOUNT */}
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


          {/* CHAT & DATA */}
          <section className="mb-7">

            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-ledger-ink/40">
              Chat & Data
            </p>

            <div className="overflow-hidden rounded-lg border border-ledger-rule">

              <button
                type="button"
                onClick={handleClearHistory}
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
                onClick={handleExportHistory}
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


          {/* PRIVACY & SECURITY */}
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
                    Your chat history is securely linked
                    to your account. Other users cannot
                    access your chats.
                  </p>

                </div>

              </div>

            </div>


            <button
              type="button"
              onClick={handleDeleteAccount}
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
  )
}