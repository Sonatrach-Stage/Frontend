import { Link } from 'react-router-dom'
import { Download, Eye, Upload } from 'lucide-react'
import { Badge } from '../../../lib/shadcn/badge'
import { Card } from '../../../lib/shadcn/card'
import { Button } from '../../../lib/shadcn/button'
import { internDocuments } from '../../data/dashboardMockData'

const groups: Record<string, string[]> = {
  Administratif: ['Convention', 'Attestation'],
  Stage: ['Cahier des charges'],
  'PFE / PFC': ['Rapport hebdomadaire', 'Mémoire'],
}

export default function MyDocumentsPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mes documents</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
      </div>

      <Card className="mb-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Déposer un document</h2>
        <p className="mt-2 text-sm text-muted-foreground">Pour un rapport ou un mémoire, utilisez la page dédiée.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild className="rounded-xl bg-[rgb(var(--intern-navy))] text-white">
            <Link to="../rapport"><Upload className="h-4 w-4" /> Déposer un rapport / mémoire</Link>
          </Button>
          <Button variant="outline" className="rounded-xl"><Upload className="h-4 w-4" /> Autre document</Button>
        </div>
      </Card>

      {Object.entries(groups).map(([groupName, types]) => (
        <div key={groupName} className="mb-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">{groupName}</h2>
          <div className="space-y-3">
            {internDocuments
              .filter((doc) => types.includes(doc.type))
              .map((doc) => (
                <Card key={doc.id} className="rounded-2xl p-4 shadow-retool-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.type} · {doc.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="rounded-full">{doc.status}</Badge>
                      <Button size="sm" variant="outline" className="rounded-lg"><Eye className="h-3.5 w-3.5" /></Button>
                      <Button size="sm" variant="outline" className="rounded-lg"><Download className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                </Card>
              ))}
            {internDocuments.filter((doc) => types.includes(doc.type)).length === 0 && (
              <p className="text-sm text-muted-foreground">Aucun document dans cette catégorie.</p>
            )}
          </div>
        </div>
      ))}
    </>
  )
}