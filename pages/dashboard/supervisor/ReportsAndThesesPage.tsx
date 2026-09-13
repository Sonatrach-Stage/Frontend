import { useState } from 'react'
import { CheckCircle2, Download, Eye, MessageSquare, RotateCcw } from 'lucide-react'
import { Badge } from '../../../lib/shadcn/badge'
import { Card } from '../../../lib/shadcn/card'
import { Button } from '../../../lib/shadcn/button'
import { cn } from '../../../lib/shadcn/utils'
import { theses as initialTheses, type Thesis } from '../../data/dashboardMockData'

const statusColors: Record<Thesis['status'], string> = {
  Brouillon: 'text-muted-foreground',
  Soumis: 'text-blue-600',
  'En cours de révision': 'text-amber-600',
  'À corriger': 'text-orange-600',
  Validé: 'text-emerald-600',
}

export default function ReportsAndThesesPage() {
  const [theses, setTheses] = useState<Thesis[]>(initialTheses)
  const [kindTab, setKindTab] = useState<'Rapport' | 'Mémoire'>('Rapport')
  const [typeTab, setTypeTab] = useState<'PFE' | 'PFC'>('PFE')
  const [showAllCompanies, setShowAllCompanies] = useState(false)

  const filtered = theses.filter((t) => {
    const matchesKind = t.kind === kindTab
    const matchesType = t.type === typeTab
    const matchesCompany = showAllCompanies || t.company === 'Atlas Telecom' // entreprise de l'encadrant connecté (mock)
    return matchesKind && matchesType && matchesCompany
  })

  function validate(id: number) {
    setTheses((current) =>
      current.map((t) => (t.id === id ? { ...t, status: 'Validé', published: true } : t)),
    )
  }

  function requestCorrection(id: number) {
    setTheses((current) =>
      current.map((t) => (t.id === id ? { ...t, status: 'À corriger' } : t)),
    )
  }

  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Rapports et mémoires</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Un mémoire validé devient visible par tous les utilisateurs de la plateforme.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="rounded-xl"
          onClick={() => setShowAllCompanies((v) => !v)}
        >
          {showAllCompanies ? 'Revenir à mon entreprise' : "Voir autres rapports / mémoires (autres stagiaires)"}
        </Button>
      </div>

      <div className="mb-4 flex gap-2">
        {(['Rapport', 'Mémoire'] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKindTab(k)}
            className={cn(
              'rounded-xl border px-4 py-2 text-sm font-semibold transition-colors',
              kindTab === k ? 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))]' : 'hover:bg-muted',
            )}
          >
            {k === 'Rapport' ? 'Rapports' : 'Mémoires'}
          </button>
        ))}
      </div>

      <div className="mb-5 flex gap-2">
        {(['PFE', 'PFC'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTypeTab(t)}
            className={cn(
              'rounded-lg border px-3.5 py-1.5 text-xs font-bold transition-colors',
              typeTab === t ? 'border-[rgb(var(--intern-navy))] bg-[rgb(var(--intern-navy))] text-white' : 'hover:bg-muted',
            )}
          >
            Package {t}
          </button>
        ))}
      </div>

      {showAllCompanies && (
        <p className="mb-4 text-xs font-semibold text-[rgb(var(--intern-blue))]">
          Vue élargie : tous les {kindTab === 'Rapport' ? 'rapports' : 'mémoires'} {typeTab} de toutes les entreprises.
        </p>
      )}

      <div className="space-y-3">
        {filtered.map((thesis) => (
          <Card key={thesis.id} className="rounded-2xl p-5 shadow-retool-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-bold text-foreground">{thesis.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {thesis.intern} · {thesis.company} · Version {thesis.version} · {thesis.date}
                </p>
                {thesis.published && (
                  <Badge className="mt-2 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                    <CheckCircle2 className="mr-1 h-3 w-3" /> Publié — visible par tous
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={cn('rounded-full', statusColors[thesis.status])}>
                  {thesis.status}
                </Badge>
                <Button size="sm" variant="outline" className="rounded-lg"><Eye className="h-3.5 w-3.5" /> Consulter</Button>
                <Button size="sm" variant="outline" className="rounded-lg"><Download className="h-3.5 w-3.5" /> Télécharger</Button>
                {!showAllCompanies && thesis.status !== 'Validé' && (
                  <>
                    <Button size="sm" variant="outline" className="rounded-lg"><MessageSquare className="h-3.5 w-3.5" /> Commenter</Button>
                    <Button size="sm" className="rounded-lg bg-[rgb(var(--intern-navy))] text-white" onClick={() => validate(thesis.id)}>
                      Valider
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-lg text-orange-600" onClick={() => requestCorrection(thesis.id)}>
                      <RotateCcw className="h-3.5 w-3.5" /> Demander correction
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
            Aucun document dans cette catégorie pour le moment.
          </Card>
        )}
      </div>
    </>
  )
}