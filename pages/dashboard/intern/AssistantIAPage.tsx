import { useState } from 'react'
import {
  Bot, Send, Sparkles, Search, FileText, Layers,
  TrendingUp, ExternalLink, MessageSquarePlus, Copy, ThumbsUp, ThumbsDown,
} from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Button } from '../../../lib/shadcn/button'
import { Badge } from '../../../lib/shadcn/badge'
import { cn } from '../../../lib/shadcn/utils'
import {
  knowledgeDocs, allTags, stageLinkDocDetail, demoChatAnswers, defaultChatAnswer,
  type KnowledgeDoc,
} from '../../data/aiKnowledgeData'

type Tab = 'assistant' | 'knowledge' | 'document' | 'similar' | 'insights'

const tabs: { id: Tab; label: string; icon: typeof Bot }[] = [
  { id: 'assistant', label: 'Assistant IA', icon: Bot },
  { id: 'knowledge', label: 'Bibliothèque', icon: Layers },
  { id: 'document', label: 'Analyse de document', icon: FileText },
  { id: 'similar', label: 'Projets similaires', icon: Search },
  { id: 'insights', label: 'Insights', icon: TrendingUp },
]

const suggestions = [
  { title: 'Trouver des projets liés à mon sujet', sub: 'Réponse sourcée depuis les mémoires indexés' },
  { title: 'Résumer un mémoire', sub: 'Réponse sourcée depuis les mémoires indexés' },
  { title: 'Quels projets ont utilisé Docker ?', sub: 'Réponse sourcée depuis les mémoires indexés' },
  { title: 'Comparer deux projets', sub: 'Réponse sourcée depuis les mémoires indexés' },
]

type Message = {
  role: 'user' | 'ai'
  text: string
  sources?: { title: string; author: string; chapter: string; docId: string }[]
}

export default function AssistantIAPage() {
  const [tab, setTab] = useState<Tab>('assistant')

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">StageLink AI</h1>
          <p className="mt-1 text-sm text-muted-foreground">Votre assistant intelligent pour la connaissance des stages.</p>
        </div>
        <Badge className="rounded-full bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-navy))] hover:bg-[rgb(var(--intern-soft-blue))] dark:bg-secondary dark:text-foreground">
          Prototype de démonstration — données fictives
        </Badge>
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

      {tab === 'assistant' && <AssistantTab onOpenDoc={() => setTab('document')} />}
      {tab === 'knowledge' && <KnowledgeTab />}
      {tab === 'document' && <DocumentTab />}
      {tab === 'similar' && <SimilarProjectsTab />}
      {tab === 'insights' && <InsightsTab />}
    </>
  )
}

// ============== ASSISTANT ==============

function AssistantTab({ onOpenDoc }: { onOpenDoc: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')

  function send(text?: string) {
    const content = (text ?? draft).trim()
    if (!content) return

    const match = demoChatAnswers.find((entry) => entry.keywords.some((k) => content.toLowerCase().includes(k)))
    const response = match ?? defaultChatAnswer

    setMessages((cur) => [
      ...cur,
      { role: 'user', text: content },
      { role: 'ai', text: response.answer, sources: response.sources },
    ])
    setDraft('')
  }

  if (messages.length === 0) {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="outline" className="rounded-full text-[rgb(var(--intern-blue))]">Recherche sémantique</Badge>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {suggestions.map((s) => (
            <button key={s.title} type="button" onClick={() => send(s.title)} className="text-left">
              <Card className="rounded-2xl p-5 shadow-retool-sm transition-colors hover:border-[rgb(var(--intern-blue))]">
                <p className="font-bold text-foreground">{s.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
              </Card>
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2 rounded-2xl border bg-card p-2 shadow-sm">
          <Bot className="ml-2 h-5 w-5 text-[rgb(var(--intern-blue))]" />
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Posez votre question à StageLink AI..."
            className="h-11 border-none shadow-none focus-visible:ring-0"
          />
          <Button className="rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={() => send()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card className="flex h-[560px] flex-col rounded-3xl shadow-retool-sm">
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.map((m, i) => (
            <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'max-w-[85%] rounded-2xl px-4 py-3 text-sm',
                  m.role === 'user'
                    ? 'bg-[rgb(var(--intern-navy))] text-white'
                    : 'bg-[rgb(var(--intern-soft-blue))] text-foreground dark:bg-secondary',
                )}
              >
                {m.role === 'ai' && (
                  <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-[rgb(var(--intern-blue))]">
                    <Sparkles className="h-3.5 w-3.5" /> StageLink AI
                  </p>
                )}
                <p className="whitespace-pre-line leading-6">{m.text}</p>

                {m.sources && (
                  <div className="mt-3 space-y-2 border-t border-black/10 pt-3">
                    <p className="text-xs font-bold text-muted-foreground">Sources</p>
                    {m.sources.map((s) => (
                      <button
                        key={s.docId + s.chapter}
                        type="button"
                        onClick={onOpenDoc}
                        className="block w-full rounded-xl bg-card p-2.5 text-left text-xs shadow-sm hover:border-[rgb(var(--intern-blue))]"
                      >
                        <p className="font-bold text-foreground">« {s.title} »</p>
                        <p className="text-muted-foreground">{s.author} — {s.chapter}</p>
                        <p className="mt-1 flex items-center gap-1 font-semibold text-[rgb(var(--intern-blue))]">
                          Ouvrir la source <ExternalLink className="h-3 w-3" />
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {m.role === 'ai' && (
                  <div className="mt-3 flex items-center gap-3 text-muted-foreground">
                    <button type="button" className="hover:text-foreground"><Copy className="h-3.5 w-3.5" /></button>
                    <button type="button" className="hover:text-foreground"><MessageSquarePlus className="h-3.5 w-3.5" /></button>
                    <button type="button" className="hover:text-emerald-600"><ThumbsUp className="h-3.5 w-3.5" /></button>
                    <button type="button" className="hover:text-red-600"><ThumbsDown className="h-3.5 w-3.5" /></button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t p-4">
          <Bot className="h-5 w-5 text-[rgb(var(--intern-blue))]" />
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask StageLink AI..."
            className="h-10 rounded-xl"
          />
          <Button className="rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={() => send()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Réponses générées à partir des mémoires indexés — chaque affirmation renvoie à sa source.
      </p>
    </div>
  )
}

// ============== KNOWLEDGE LIBRARY ==============

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
      <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Bibliothèque de connaissances</h2>
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
                <button
                  type="button"
                  onClick={() => setActiveTags([])}
                  className="mt-3 text-xs font-semibold text-[rgb(var(--intern-blue))] hover:underline"
                >
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
            <Badge
              key={tag}
              className="cursor-pointer rounded-full bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy))]"
              onClick={() => toggleTag(tag)}
            >
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
              {doc.technologies.map((t) => (
                <Badge key={t} variant="outline" className="rounded-full text-[10px]">{t}</Badge>
              ))}
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

// ============== DOCUMENT INTELLIGENCE ==============

function DocumentTab() {
  const [selected, setSelected] = useState<KnowledgeDoc>(knowledgeDocs.find((d) => d.id === 'doc-stagelink') ?? knowledgeDocs[0])

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <Card className="h-fit rounded-2xl p-3 shadow-retool-sm">
        <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Documents</p>
        {knowledgeDocs.map((doc) => (
          <button
            key={doc.id}
            type="button"
            onClick={() => setSelected(doc)}
            className={cn(
              'block w-full rounded-xl px-3 py-2 text-left text-xs font-semibold hover:bg-muted',
              selected.id === doc.id && 'bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-navy))]',
            )}
          >
            {doc.title}
          </button>
        ))}
      </Card>

      <div>
        <div className="mb-4">
          <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{selected.title}</h2>
          <p className="text-sm text-muted-foreground">{selected.author} · {selected.type} · {selected.year}</p>
        </div>

        {selected.id === 'doc-stagelink' ? (
          <>
            <Card className="mb-6 rounded-2xl p-5 shadow-retool-sm">
              <h3 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Structure du document</h3>
              <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {stageLinkDocDetail.chapters.map((c, i) => (
                  <li key={c.title}>{i + 1}. {c.title}</li>
                ))}
              </ol>
            </Card>

            <Card className="mb-6 rounded-2xl p-5 shadow-retool-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[rgb(var(--intern-blue))]" />
                <h3 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Résumé généré par IA</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{stageLinkDocDetail.summary.executive}</p>

              <SummaryList title="Objectifs" items={stageLinkDocDetail.summary.objectives} />
              <div className="mt-4 flex flex-wrap gap-1.5">
                {selected.technologies.map((t) => <Badge key={t} variant="outline" className="rounded-full">{t}</Badge>)}
              </div>
              <SummaryList title="Résultats clés" items={stageLinkDocDetail.summary.results} />
              <SummaryList title="Limites" items={stageLinkDocDetail.summary.limits} />
              <SummaryList title="Perspectives" items={stageLinkDocDetail.summary.perspectives} />
            </Card>

            <Card className="rounded-2xl p-5 shadow-retool-sm">
              <h3 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Chapitre : Introduction</h3>
              <p className="mt-2 text-sm text-muted-foreground">{stageLinkDocDetail.chapters[0].summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Résumer le chapitre 4', 'Quelles technologies ont été utilisées ?', "Quel est l'objectif principal ?", 'Quelles sont les limites ?'].map((q) => (
                  <Badge key={q} variant="outline" className="cursor-pointer rounded-full hover:bg-muted">{q}</Badge>
                ))}
              </div>
            </Card>
          </>
        ) : (
          <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
            Aperçu détaillé disponible uniquement pour le document de démonstration « {knowledgeDocs.find((d) => d.id === 'doc-stagelink')?.title} ».
          </Card>
        )}
      </div>
    </div>
  )
}

function SummaryList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{title}</p>
      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </div>
  )
}

// ============== SIMILAR PROJECTS ==============

function SimilarProjectsTab() {
  const reference = knowledgeDocs.find((d) => d.id === 'doc-stagelink') ?? knowledgeDocs[0]
  const others = knowledgeDocs.filter((d) => d.id !== reference.id)

  function similarityScore(doc: KnowledgeDoc) {
    const shared = doc.technologies.filter((t) => reference.technologies.includes(t)).length
    return Math.min(95, 40 + shared * 15)
  }

  const ranked = [...others].sort((a, b) => similarityScore(b) - similarityScore(a))

  return (
    <>
      <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Projets similaires</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Basé sur : « {reference.title} » ({reference.author}, {reference.year})
      </p>

      <div className="mt-5 space-y-3">
        {ranked.map((doc) => {
          const score = similarityScore(doc)
          return (
            <Card key={doc.id} className="rounded-2xl p-5 shadow-retool-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{doc.title}</p>
                  <p className="text-xs text-muted-foreground">{doc.author} · {doc.type} · {doc.year}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-[rgb(var(--intern-blue))]" style={{ width: `${score}%` }} />
                  </div>
                  <span className="text-xs font-bold text-[rgb(var(--intern-navy))] dark:text-foreground">{score}%</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {doc.technologies.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className={cn('rounded-full text-[10px]', reference.technologies.includes(t) && 'border-[rgb(var(--intern-blue))] text-[rgb(var(--intern-blue))]')}
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}

// ============== INSIGHTS ==============

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
      <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">AI Insights</h2>
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

        <Card className="rounded-2xl p-6 shadow-retool-sm lg:col-span-2">
          <h3 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Chiffres clés</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-background/70 p-4 text-center">
              <p className="text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{knowledgeDocs.length}</p>
              <p className="mt-1 text-xs text-muted-foreground">Documents indexés</p>
            </div>
            <div className="rounded-xl bg-background/70 p-4 text-center">
              <p className="text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{knowledgeDocs.filter((d) => d.type === 'PFE').length}</p>
              <p className="mt-1 text-xs text-muted-foreground">PFE</p>
            </div>
            <div className="rounded-xl bg-background/70 p-4 text-center">
              <p className="text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{knowledgeDocs.filter((d) => d.type === 'PFC').length}</p>
              <p className="mt-1 text-xs text-muted-foreground">PFC</p>
            </div>
            <div className="rounded-xl bg-background/70 p-4 text-center">
              <p className="text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{Object.keys(techCounts).length}</p>
              <p className="mt-1 text-xs text-muted-foreground">Technologies</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}