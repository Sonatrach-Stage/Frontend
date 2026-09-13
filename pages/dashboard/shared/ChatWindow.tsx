import { useState } from 'react'
import { Paperclip, Send } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Button } from '../../../lib/shadcn/button'
import { cn } from '../../../lib/shadcn/utils'
import type { ChatMessage } from '../../data/dashboardMockData'

export function ChatWindow({
  contactName,
  contactRole,
  initialMessages,
  currentRole,
}: {
  contactName: string
  contactRole: string
  initialMessages: ChatMessage[]
  currentRole: 'intern' | 'supervisor'
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [draft, setDraft] = useState('')

  function sendMessage() {
    if (!draft.trim()) return
    setMessages((current) => [
      ...current,
      { id: current.length + 1, sender: currentRole, text: draft.trim(), time: 'À l\'instant' },
    ])
    setDraft('')
  }

  return (
    <Card className="flex h-[600px] flex-col rounded-3xl shadow-retool-sm">
      <div className="flex items-center gap-3 border-b p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(var(--intern-soft-blue))] font-black text-[rgb(var(--intern-navy))]">
          {contactName.split(' ').map((p) => p[0]).join('').slice(0, 2)}
        </div>
        <div>
          <p className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{contactName}</p>
          <p className="text-xs text-muted-foreground">{contactRole}</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-5">
        {messages.map((msg) => (
          <div key={msg.id} className={cn('flex', msg.sender === currentRole ? 'justify-end' : 'justify-start')}>
            <div
              className={cn(
                'max-w-[70%] rounded-2xl px-4 py-2.5 text-sm',
                msg.sender === currentRole
                  ? 'bg-[rgb(var(--intern-navy))] text-white'
                  : 'bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-navy))] dark:bg-secondary dark:text-foreground',
              )}
            >
              <p>{msg.text}</p>
              <p className={cn('mt-1 text-[10px]', msg.sender === currentRole ? 'text-white/60' : 'text-muted-foreground')}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">Aucun message pour le moment.</p>
        )}
      </div>

      <div className="flex items-center gap-2 border-t p-4">
        <Button type="button" variant="outline" size="icon" className="rounded-xl">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Écrivez un message..."
          className="h-10 rounded-xl"
        />
        <Button type="button" className="rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={sendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}