import { useState } from 'react'
import { Download, Eye, FileText, Search } from 'lucide-react'
import { Badge } from '../../../lib/shadcn/badge'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Button } from '../../../lib/shadcn/button'
import { cn } from '../../../lib/shadcn/utils'
import { supervisorDocuments, type DocCategory } from '../../data/dashboardMockData'

const categories: Array<DocCategory | 'Tous'> = [
  'Tous', 'Convention', 'Rapport', 'Mémoire', 'Cahier des charges', 'Attestation', 'Administratif', 'Autre',
]

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState<DocCategory | 'Tous'>('Tous')
  const [search, setSearch] = useState('')

  const filtered = supervisorDocuments.filter((doc) => {
    const matchesCategory = activeCategory === 'Tous' || doc.category === activeCategory
    const matchesSearch = `${doc.name} ${doc.intern}`.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Documents</h1>
        <p className="mt-2 text-sm text-muted-foreground">Bibliothèque personnelle des documents de vos stagiaires.</p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors',
              activeCategory === cat ? 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-navy))]' : 'hover:bg-muted',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative mb-5 max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un document ou un stagiaire..."
          className="h-10 rounded-2xl pl-11 shadow-sm"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((doc) => (
          <Card key={doc.id} className="rounded-2xl p-4 shadow-retool-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))]">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.intern} · {doc.category} · {doc.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn('rounded-full', !doc.seen && 'border-amber-300 text-amber-600')}
                >
                  {doc.seen ? 'Consulté' : "En cours d'exécution"}
                </Badge>
                <Button size="sm" variant="outline" className="rounded-lg"><Eye className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="outline" className="rounded-lg"><Download className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
            Aucun document dans cette catégorie.
          </Card>
        )}
      </div>
    </>
  )
}