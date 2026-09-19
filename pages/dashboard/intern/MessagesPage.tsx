import { ChatWindow } from '../shared/ChatWindow'
import { chatByIntern } from '../../data/dashboardMockData'

export default function MessagesPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Messages</h1>
        <p className="mt-2 text-sm text-muted-foreground">
         
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <ChatWindow
          contactName="Ahmed Benali"
          contactRole="Architecte réseau senior · Votre encadrant"
          initialMessages={chatByIntern.Sara}
          currentRole="intern"
        />
      </div>
    </>
  )
}