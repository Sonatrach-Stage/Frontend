import { useEffect, useState } from 'react'
import { ErrorBoundary } from '../shared/ErrorBoundary'
import {
  Bot, Send, Sparkles, Search, FileText, Layers,
  TrendingUp, ExternalLink, Plus, Trash2, GitCompare,
} from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Button } from '../../../lib/shadcn/button'
import { Badge } from '../../../lib/shadcn/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../lib/shadcn/select'
import { cn } from '../../../lib/shadcn/utils'
import {
  askAI, getDocumentSummary, getSimilarDocuments, compareDocuments,
  getMyAIConversations, getAIConversation, deleteAIConversation,
  type AIConversation, type AIMessage, type AISource,
} from '../../../services/ai'
import { getMyDocuments, type ApiDocument } from '../../../services/documents'
import { knowledgeDocs, allTags } from '../../data/aiKnowledgeData'

type Tab = 'assistant' | 'documents' | 'knowledge' | 'insights'

const tabs: { id: Tab; label: string; icon: typeof Bot }[] = [
  { id: 'assistant', label: 'Assistant IA', icon: Bot },
  { id: 'documents', label: 'Mes documents (IA)', icon: FileText },
  { id: 'knowledge', label: 'Bibliothèque', icon: Layers },
  { id: 'insights', label: 'Insights', icon: TrendingUp },
]

export default function AssistantIAPage() {
  const [tab, setTab] = useState<Tab>('assistant')

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">StageLink AI</h1>
        <p className="mt-1 text-sm text-muted-foreground">Votre assistant intelligent pour la connaissance des stages.</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 border-b pb-3">
        {tabs.map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                'flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors',
                tab === t.id ? 'bg-[rgb(var(--intern-navy))] text-white' : 'text-muted-foreground hover:bg-muted',
              )}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      <ErrorBoundary resetKey={tab}>
  {tab === 'assistant' && <AssistantTab />}
  {tab === 'documents' && <DocumentAnalysisTab />}
  {tab === 'knowledge' && <KnowledgeTab />}
  {tab === 'insights' && <InsightsTab />}
</ErrorBoundary>
    </>
  )
}

// ============== ASSISTANT (réel, /ai/ask + conversations) ==============

function AssistantTab() {
  const [conversations, setConversations] = useState<AIConversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null)
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [sourcesByMessage, setSourcesByMessage] = useState<Record<number, AISource[]>>({})
  const [draft, setDraft] = useState('')
  const [loadingList, setLoadingList] = useState(true)
  const [loadingConv, setLoadingConv] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  function loadConversations() {
    setLoadingList(true)
    getMyAIConversations()
      .then((res) => setConversations(res.conversations))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoadingList(false))
  }

  useEffect(() => {
    loadConversations()
  }, [])

  async function openConversation(id: number) {
    setActiveConversationId(id)
    setLoadingConv(true)
    setError('')
    try {
      const res = await getAIConversation(id)
      setMessages(res.messages)
      setSourcesByMessage({})
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement de la conversation')
    } finally {
      setLoadingConv(false)
    }
  }

  function startNewConversation() {
    setActiveConversationId(null)
    setMessages([])
    setSourcesByMessage({})
  }

  async function handleDeleteConversation(id: number) {
    if (!confirm('Supprimer cette conversation ?')) return
    try {
      await deleteAIConversation(id)
      setConversations((cur) => cur.filter((c) => c.id !== id))
      if (activeConversationId === id) startNewConversation()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    }
  }

  async function send() {
    const question = draft.trim()
    if (!question) return
    setSending(true)
    setError('')

    const optimisticUserMsg: AIMessage = {
      id: Date.now(),
      conversation_id: activeConversationId ?? 0,
      role: 'user',
      content: question,
      created_at: new Date().toISOString(),
    }
    setMessages((cur) => [...cur, optimisticUserMsg])
    setDraft('')

    try {
      const res = await askAI(question, activeConversationId ?? undefined)
      const aiMsg: AIMessage = {
        id: Date.now() + 1,
        conversation_id: res.conversation.id,
        role: 'assistant',
        content: res.answer,
        created_at: new Date().toISOString(),
      }
      setMessages((cur) => [...cur, aiMsg])
      setSourcesByMessage((cur) => ({ ...cur, [aiMsg.id]: res.sources }))

      if (!activeConversationId) {
        setActiveConversationId(res.conversation.id)
        loadConversations()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi de la question")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card className="h-fit rounded-2xl p-3 shadow-retool-sm">
        <Button className="w-full rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={startNewConversation}>
          <Plus className="h-4 w-4" /> Nouvelle conversation
        </Button>

        <p className="mb-1 mt-4 px-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Conversations</p>
        {loadingList && <p className="px-2 text-xs text-muted-foreground">Chargement...</p>}
        <div className="space-y-1">
          {conversations.map((c) => (
            <div
              key={c.id}
              className={cn(
                'group flex items-center gap-1 rounded-xl px-2 py-1',
                activeConversationId === c.id && 'bg-[rgb(var(--intern-soft-blue))]',
              )}
            >
              <button
                type="button"
                onClick={() => openConversation(c.id)}
                className="min-w-0 flex-1 truncate rounded-lg px-1.5 py-1.5 text-left text-xs font-semibold text-foreground hover:bg-muted"
              >
                {c.title}
              </button>
              <button
                type="button"
                onClick={() => handleDeleteConversation(c.id)}
                className="shrink-0 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-muted"
                aria-label="Supprimer"
              >
                <Trash2 className="h-3 w-3 text-muted-foreground hover:text-red-600" />
              </button>
            </div>
          ))}
          {!loadingList && conversations.length === 0 && (
            <p className="px-2 text-xs text-muted-foreground">Aucune conversation.</p>
          )}
        </div>
      </Card>

      <div>
        {messages.length === 0 && !loadingConv ? (
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="rounded-full text-[rgb(var(--intern-blue))]">Recherche documentaire</Badge>
            <h2 className="mt-4 text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">StageLink AI</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Posez une question sur les documents de votre entreprise.
            </p>
            <div className="mt-8 flex items-center gap-2 rounded-2xl border bg-card p-2 shadow-sm">
              <Bot className="ml-2 h-5 w-5 text-[rgb(var(--intern-blue))]" />
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ex. Quel est le statut du module de paiement ?"
                className="h-11 border-none shadow-none focus-visible:ring-0"
              />
              <Button disabled={sending} className="rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={send}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}
          </div>
        ) : (
          <Card className="flex h-[560px] flex-col rounded-3xl shadow-retool-sm">
            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {loadingConv && <p className="text-center text-sm text-muted-foreground">Chargement...</p>}
              {!loadingConv && messages.map((m) => (
                <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-4 py-3 text-sm',
                      m.role === 'user'
                        ? 'bg-[rgb(var(--intern-navy))] text-white'
                        : 'bg-[rgb(var(--intern-soft-blue))] text-foreground dark:bg-secondary',
                    )}
                  >
                    {m.role === 'assistant' && (
                      <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-[rgb(var(--intern-blue))]">
                        <Sparkles className="h-3.5 w-3.5" /> StageLink AI
                      </p>
                    )}
                    <p className="whitespace-pre-line leading-6">{m.content}</p>

                    {sourcesByMessage[m.id] && sourcesByMessage[m.id].length > 0 && (
                      <div className="mt-3 space-y-2 border-t border-black/10 pt-3">
                        <p className="text-xs font-bold text-muted-foreground">Sources</p>
                        {sourcesByMessage[m.id].map((s) => (
                          <div key={s.document_id} className="rounded-xl bg-card p-2.5 text-xs shadow-sm">
                            <p className="font-bold text-foreground">{s.title}</p>
                            {s.excerpt && <p className="mt-1 text-muted-foreground">{s.excerpt}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {error && <p className="mx-4 mb-2 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}
            <div className="flex items-center gap-2 border-t p-4">
              <Bot className="h-5 w-5 text-[rgb(var(--intern-blue))]" />
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask StageLink AI..."
                className="h-10 rounded-xl"
              />
              <Button disabled={sending} className="rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={send}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

// ============== ANALYSE DE DOCUMENTS (réel : résumé / similaires / comparer) ==============
function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => (typeof v === 'string' ? v : JSON.stringify(v)))
  }
  if (typeof value === 'string' && value.trim()) return [value]
  return []
}

function toText(value: unknown): string {
  if (typeof value === 'string') return value
  if (value === null || value === undefined) return ''
  return JSON.stringify(value)
}

function DocumentAnalysisTab() {
  const [documents, setDocuments] = useState<ApiDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [compareId, setCompareId] = useState<number | null>(null)

  const [summary, setSummary] = useState<{ summary: string; keyPoints: string[] } | null>(null)
  const [similar, setSimilar] = useState<{ document_id: number; title: string; score: number }[] | null>(null)
  const [comparison, setComparison] = useState<{ comparison: string; similarities: string[]; differences: string[] } | null>(null)

  const [loadingAction, setLoadingAction] = useState<'summary' | 'similar' | 'compare' | null>(null)
  const [actionError, setActionError] = useState('')

  useEffect(() => {
    getMyDocuments()
      .then((res) => setDocuments(Array.isArray(res.documents) ? res.documents : []))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }, [])

  function selectDocument(id: number) {
    setSelectedId(id)
    setCompareId(null)
    setSummary(null)
    setSimilar(null)
    setComparison(null)
    setActionError('')
  }

  async function handleSummarize() {
    if (!selectedId) return
    setLoadingAction('summary')
    setActionError('')
    try {
      const res = await getDocumentSummary(selectedId)
      setSummary({ summary: toText(res.summary), keyPoints: toStringArray(res.keyPoints) })
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Erreur lors de la génération du résumé')
    } finally {
      setLoadingAction(null)
    }
  }

  async function handleFindSimilar() {
    if (!selectedId) return
    setLoadingAction('similar')
    setActionError('')
    try {
      const res = await getSimilarDocuments(selectedId)
      const list = Array.isArray(res.similarProjects) ? res.similarProjects : []
      setSimilar(
        list.map((s) => ({
          document_id: Number(s.document_id),
          title: toText(s.title),
          score: Number(s.similarity_score) || 0,
        })),
      )
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Erreur lors de la recherche de projets similaires')
    } finally {
      setLoadingAction(null)
    }
  }

  async function handleCompare() {
    if (!selectedId || !compareId) return
    setLoadingAction('compare')
    setActionError('')
    try {
      const res = await compareDocuments(selectedId, compareId)
      setComparison({
        comparison: toText(res.comparison),
        similarities: toStringArray(res.similarities),
        differences: toStringArray(res.differences),
      })
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Erreur lors de la comparaison')
    } finally {
      setLoadingAction(null)
    }
  }

  const selectedDoc = documents.find((d) => d.id === selectedId)

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card className="h-fit rounded-2xl p-3 shadow-retool-sm">
        <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Mes documents</p>
        {loading && <p className="px-2 text-xs text-muted-foreground">Chargement...</p>}
        {error && <p className="px-2 text-xs text-red-600">{error}</p>}
        {!loading && documents.map((doc) => (
          <button
            key={doc.id}
            type="button"
            onClick={() => selectDocument(doc.id)}
            className={cn(
              'block w-full rounded-xl px-3 py-2 text-left text-xs font-semibold hover:bg-muted',
              selectedId === doc.id && 'bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-navy))]',
            )}
          >
            {doc.title}
          </button>
        ))}
        {!loading && documents.length === 0 && (
          <p className="px-2 text-xs text-muted-foreground">Aucun document. Créez-en un dans « Mes documents ».</p>
        )}
      </Card>

      <div>
        {!selectedDoc ? (
          <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
            Sélectionnez un document pour l'analyser avec l'IA.
          </Card>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{selectedDoc.title}</h2>
              <p className="text-sm text-muted-foreground">{selectedDoc.document_type}</p>
            </div>

            {actionError && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{actionError}</p>}

            <Card className="mb-6 rounded-2xl p-5 shadow-retool-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[rgb(var(--intern-blue))]" />
                  <h3 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Résumé IA</h3>
                </div>
                <Button size="sm" disabled={loadingAction === 'summary'} className="rounded-lg bg-[rgb(var(--intern-navy))] text-white" onClick={handleSummarize}>
                  {loadingAction === 'summary' ? 'Génération...' : summary ? 'Régénérer' : 'Générer le résumé'}
                </Button>
              </div>
              {summary && (
                <>
                  <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">{summary.summary}</p>
                  {summary.keyPoints.length > 0 && (
                    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {summary.keyPoints.map((p, i) => <li key={`${i}-${p}`}>• {p}</li>)}
                    </ul>
                  )}
                </>
              )}
            </Card>

            <Card className="mb-6 rounded-2xl p-5 shadow-retool-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-[rgb(var(--intern-blue))]" />
                  <h3 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Projets similaires</h3>
                </div>
                <Button size="sm" disabled={loadingAction === 'similar'} className="rounded-lg bg-[rgb(var(--intern-navy))] text-white" onClick={handleFindSimilar}>
                  {loadingAction === 'similar' ? 'Recherche...' : 'Rechercher'}
                </Button>
              </div>
              {similar && (
                <div className="mt-3 space-y-2">
                  {similar.map((s, i) => (
                    <div key={`${s.document_id}-${i}`} className="flex items-center justify-between rounded-xl border bg-background/70 p-3 text-sm">
                      <span className="font-semibold text-foreground">{s.title}</span>
                      <Badge variant="outline" className="rounded-full">{Math.round(s.score * 100)}%</Badge>
                    </div>
                  ))}
                  {similar.length === 0 && <p className="mt-2 text-sm text-muted-foreground">Aucun document similaire trouvé.</p>}
                </div>
              )}
            </Card>

            <Card className="rounded-2xl p-5 shadow-retool-sm">
              <div className="flex items-center gap-2">
                <GitCompare className="h-4 w-4 text-[rgb(var(--intern-blue))]" />
                <h3 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Comparer avec un autre document</h3>
              </div>
              <div className="mt-3 flex gap-2">
                <select
                  value={compareId ?? ''}
                  onChange={(e) => setCompareId(e.target.value ? Number(e.target.value) : null)}
                  className="h-10 flex-1 rounded-xl border bg-background px-3 text-sm"
                >
                  <option value="">Choisir un document</option>
                  {documents.filter((d) => d.id !== selectedId).map((d) => (
                    <option key={d.id} value={d.id}>{d.title}</option>
                  ))}
                </select>
                <Button disabled={!compareId || loadingAction === 'compare'} className="rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={handleCompare}>
                  {loadingAction === 'compare' ? '...' : 'Comparer'}
                </Button>
              </div>
              {comparison && (
                <div className="mt-4 space-y-3">
                  <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">{comparison.comparison}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Similitudes</p>
                      <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
                        {comparison.similarities.map((s, i) => <li key={`${i}-${s}`}>• {s}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Différences</p>
                      <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
                        {comparison.differences.map((d, i) => <li key={`${i}-${d}`}>• {d}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

// ============== BIBLIOTHÈQUE (démo — aucune route de parcours documentaire entreprise dans le swagger) ==============

function KnowledgeTab() {
  const [search, setSearch] = useState('')
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [tagMenuOpen, setTagMenuOpen] = useState(false)

  function toggleTag(tag: string) {
    setActiveTags((cur) => (cur.includes(tag) ? cur.filter((t) => t !== tag) : [...cur, tag]))
  }

  const filtered = knowledgeDocs.filter((doc) => {
    const matchesSearch = `${doc.title} ${doc.author}`.toLowerCase().includes(search.toLowerCase())
    const matchesTags = activeTags.length === 0 || activeTags.every((tag) => doc.technologies.includes(tag) || doc.type === tag || doc.domain.includes(tag))
    return matchesSearch && matchesTags
  })

  return (
    <>
      <div className="mb-1 flex items-center gap-2">
        <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Bibliothèque de connaissances</h2>
        <Badge variant="outline" className="rounded-full text-xs">Démo</Badge>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Explorez la connaissance produite par les stages précédents.</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Recherche sémantique..." className="h-10 rounded-2xl pl-11" />
        </div>

        <div className="relative">
          <Button variant="outline" className="rounded-xl" onClick={() => setTagMenuOpen((v) => !v)}>
            Filtrer par tag {activeTags.length > 0 ? `(${activeTags.length})` : ''}
          </Button>

          {tagMenuOpen && (
            <div className="absolute right-0 z-30 mt-2 w-80 rounded-2xl border bg-card p-4 shadow-retool-md">
              <div className="flex max-h-64 flex-wrap gap-1.5 overflow-y-auto">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
                      activeTags.includes(tag) ? 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-navy))]' : 'hover:bg-muted',
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {activeTags.length > 0 && (
                <button type="button" onClick={() => setActiveTags([])} className="mt-3 text-xs font-semibold text-[rgb(var(--intern-blue))] hover:underline">
                  Effacer les filtres
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {activeTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {activeTags.map((tag) => (
            <Badge key={tag} className="cursor-pointer rounded-full bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy))]" onClick={() => toggleTag(tag)}>
              {tag} ×
            </Badge>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs font-semibold text-muted-foreground">{filtered.length} document(s) indexé(s)</p>

      <div className="mt-3 grid gap-4 md:grid-cols-2">
        {filtered.map((doc) => (
          <Card key={doc.id} className="rounded-2xl p-5 shadow-retool-sm">
            <div className="flex items-start justify-between gap-2">
              <p className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{doc.title}</p>
              <Badge variant="outline" className="shrink-0 rounded-full">{doc.type}</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{doc.author} · {doc.year} · {doc.domain}</p>
            <p className="mt-2 text-sm text-muted-foreground">{doc.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {doc.technologies.map((t) => <Badge key={t} variant="outline" className="rounded-full text-[10px]">{t}</Badge>)}
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground md:col-span-2">
            Aucun document ne correspond à ces critères.
          </Card>
        )}
      </div>
    </>
  )
}

// ============== INSIGHTS (démo) ==============

function InsightsTab() {
  const domainCounts = knowledgeDocs.reduce<Record<string, number>>((acc, d) => {
    const key = d.domain.split(' / ')[0]
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {})

  const techCounts = knowledgeDocs
    .flatMap((d) => d.technologies)
    .reduce<Record<string, number>>((acc, t) => {
      acc[t] = (acc[t] ?? 0) + 1
      return acc
    }, {})

  const topTechs = Object.entries(techCounts).sort((a, b) => b[1] - a[1]).slice(0, 6)
  const maxDomain = Math.max(...Object.values(domainCounts), 1)

  return (
    <>
      <div className="mb-1 flex items-center gap-2">
        <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">AI Insights</h2>
        <Badge variant="outline" className="rounded-full text-xs">Démo</Badge>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Tendances observées dans la base de connaissances.</p>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl p-6 shadow-retool-sm">
          <h3 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Répartition par domaine</h3>
          <div className="mt-4 space-y-3">
            {Object.entries(domainCounts).map(([domain, count]) => (
              <div key={domain}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-foreground">{domain}</span>
                  <span className="text-muted-foreground">{count}</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-[rgb(var(--intern-blue))]" style={{ width: `${(count / maxDomain) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-2xl p-6 shadow-retool-sm">
          <h3 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Technologies les plus citées</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {topTechs.map(([tech, count]) => (
              <Badge key={tech} className="rounded-full bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-navy))] hover:bg-[rgb(var(--intern-soft-blue))] dark:bg-secondary dark:text-foreground">
                {tech} · {count}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}