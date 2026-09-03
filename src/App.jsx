import Header from './components/Header.jsx'
import MessageArea from './components/MessageArea.jsx'
import InputBar from './components/InputBar.jsx'

export default function App() {
  return (
    <div className="flex h-screen flex-col bg-ledger-paper">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <MessageArea />
      </main>
      <InputBar />
    </div>
  )
}
