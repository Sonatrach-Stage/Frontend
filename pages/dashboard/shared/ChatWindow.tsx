import { useEffect, useRef, useState } from 'react'
import { Paperclip, Send, Trash2 } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Button } from '../../../lib/shadcn/button'
import { cn } from '../../../lib/shadcn/utils'
import { connectSocket } from '../../../lib/socket'
import { getOrCreateConversation, getConversationMessages, deleteMessage as apiDeleteMessage, type ChatMessage as ApiChatMessage } from '../../../api/chat'
import { getCurrentUser } from '../../../lib/auth'

export function ChatWindow({
  contactName,
  contactRole,
}: {
  contactName: string
  contactRole: string
}) {
  const currentUser = getCurrentUser()
  const [conversationId, setConversationId] = useState<number | null>(null)
  const [messages, setMessages] = useState<ApiChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [otherTyping, setOtherTyping] = useState(false)
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let cancelled = false

    async function init() {
      setLoading(true)
      setError('')
      try {
        const { conversation } = await getOrCreateConversation(contactName)
        if (cancelled) return
        setConversationId(conversation.id)

        const { messages: history } = await getConversationMessages(conversation.id)
        if (cancelled) return
        setMessages(history)

        const socket = connectSocket()
        socket.emit('join_conversation', { conversation_id: conversation.id })

        socket.on('new_message', (message: ApiChatMessage) => {
          if (message.conversation_id === conversation.id) {
            setMessages((current) => [...current, message])
          }
        })

        socket.on('message_error', (payload: { message: string }) => {
          setError(payload.message)
        })

        socket.on('user_typing', () => setOtherTyping(true))
        socket.on('user_stop_typing', () => setOtherTyping(false))
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Erreur de chargement de la conversation')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    init()

    return () => {
      cancelled = true
      const socket = connectSocket()
      socket.off('new_message')
      socket.off('message_error')
      socket.off('user_typing')
      socket.off('user_stop_typing')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactName])

  function handleInputChange(value: string) {
    setDraft(value)
    if (!conversationId) return

    const socket = connectSocket()
    socket.emit('typing', { conversation_id: conversationId })

    if (typingTimeout.current) clearTimeout(typingTimeout.current)
    typingTimeout.current = setTimeout(() => {
      socket.emit('stop_typing', { conversation_id: conversationId })
    }, 1500)
  }

  function sendMessage() {
    if (!draft.trim() || !conversationId) return
    const socket = connectSocket()
    socket.emit('send_message', { conversation_id: conversationId, content: draft.trim() })
    socket.emit('stop_typing', { conversation_id: conversationId })
    setDraft('')
  }

  async function handleDeleteMessage(messageId: number) {
    if (!confirm('Supprimer ce message ?')) return
    try {
      await apiDeleteMessage(messageId)
      setMessages((current) => current.filter((m) => m.id !== messageId))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    }
  }

  return (
    <Card className="flex h-[600px] flex-col rounded-3xl shadow-retool-sm">
      <div className="flex items-center gap-3 border-b p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(var(--intern-soft-blue))] font-black text-[rgb(var(--intern-navy))]">
          {contactName.split(' ').map((p) => p[0]).join('').slice(0, 2)}
        </div>
        <div>
          <p className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{contactName}</p>
          <p className="text-xs text-muted-foreground">{otherTyping ? 'En train d\'écrire...' : contactRole}</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-5">
        {loading && <p className="text-center text-sm text-muted-foreground">Chargement...</p>}
        {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

        {!loading && messages.map((msg) => {
          const isMine = msg.sender_id === currentUser?.id
          return (
            <div key={msg.id} className={cn('group flex items-center gap-2', isMine ? 'justify-end' : 'justify-start')}>
              {isMine && (
                <button
                  type="button"
                  onClick={() => handleDeleteMessage(msg.id)}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Supprimer le message"
                >
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-red-600" />
                </button>
              )}
              <div
                className={cn(
                  'max-w-[70%] rounded-2xl px-4 py-2.5 text-sm',
                  isMine
                    ? 'bg-[rgb(var(--intern-navy))] text-white'
                    : 'bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-navy))] dark:bg-secondary dark:text-foreground',
                )}
              >
                <p>{msg.content}</p>
                <p className={cn('mt-1 text-[10px]', isMine ? 'text-white/60' : 'text-muted-foreground')}>
                  {new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          )
        })}
        {!loading && messages.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">Aucun message pour le moment.</p>
        )}
      </div>

      <div className="flex items-center gap-2 border-t p-4">
        <Button type="button" variant="outline" size="icon" className="rounded-xl">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Input
          value={draft}
          onChange={(e) => handleInputChange(e.target.value)}
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