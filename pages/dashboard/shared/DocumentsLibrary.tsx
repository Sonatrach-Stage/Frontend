import { Download, Eye, FileText, Search } from 'lucide-react'
import { Badge } from '../../../lib/shadcn/badge'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Button } from '../../../lib/shadcn/button'
import type { DocumentItem } from '../../data/dashboardMockData'

const statusColors: Record<DocumentItem['status'], string> = {
  'Brouillon': 'text-muted-foreground',
  'Soumis': 'text-blue-600',
  "En cours d'examen": 'text-amber-600',
  'Validé': 'text-emerald-600',
  'Corrections demandées': 'text-orange-600',
  'Refusé': 'text-red-600',
}

export function DocumentsLibrary({ title, subtitle, documents }: { title: string; subtitle: string; documents: DocumentItem[] }) {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="relative mb-5 max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Rechercher un document..." className="h-10 rounded-2xl pl-11 shadow-sm" />
      </div>

      <div className="space-y-3">
        {documents.map((doc) => (
          <Card key={doc.id} className="rounded-2xl p-4 shadow-retool-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))]">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.type} · {doc.author} · {doc.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`rounded-full ${statusColors[doc.status]}`}>{doc.status}</Badge>
                <Button size="sm" variant="outline" className="rounded-lg"><Eye className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="outline" className="rounded-lg"><Download className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          </Card>
        ))}
        {documents.length === 0 && (
          <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
            Aucun document pour le moment.
          </Card>
        )}
      </div>
    </>
  )
}