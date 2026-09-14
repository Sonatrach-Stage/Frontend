import { useState } from 'react'
import { Bot, Send, Sparkles } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Button } from '../../../lib/shadcn/button'

const suggestions = [
  'Résume la progression de tous les stages',
  'Quels stagiaires sont en retard ?',
  'Génère un rapport mensuel',
  'Liste les rapports en attente de validation',
]

type Msg = { role: 'user' | 'ai'; text: string }

export default function AssistantIAPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'ai', text: 'Bonjour ! Je peux vous aider à suivre vos stagiaires, encadrants et documents. Que voulez-vous savoir ?' },
  ])
  const [draft, setDraft] = useState('')

  function send(text?: string) {
    const content = text ?? draft
    if (!content.trim()) return
    setMessages((cur) => [...cur, { role: 'user', text: content }, { role: 'ai', text: 'Fonctionnalité à connecter à un modèle IA — réponse de démonstration.' }])
    setDraft('')
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Assistant IA</h1>
        <p className="mt-2 text-sm text-muted-foreground">Vue d'ensemble intelligente de votre entreprise.</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button key={s} type="button" onClick={() => send(s)} className="rounded-xl border px-3.5 py-2 text-xs font-semibold hover:bg-muted">
            {s}
          </button>
        ))}
      </div>

      <Card className="flex h-[500px] flex-col rounded-3xl shadow-retool-sm">
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${m.role === 'user' ? 'bg-[rgb(var(--intern-navy))] text-white' : 'bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-navy))] dark:bg-secondary dark:text-foreground'}`}>
                {m.role === 'ai' && <Sparkles className="mb-1 h-3.5 w-3.5" />}
                <p>{m.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t p-4">
          <Bot className="h-5 w-5 text-[rgb(var(--intern-blue))]" />
          <Input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Posez votre question..." className="h-10 rounded-xl" />
          <Button type="button" className="rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={() => send()}><Send className="h-4 w-4" /></Button>
        </div>
      </Card>
    </>
  )
}