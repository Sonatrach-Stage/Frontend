import { useState } from 'react'
import { Search } from 'lucide-react'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { cn } from '../../../lib/shadcn/utils'
import { supervisorInternsDetailed, type SupervisorIntern } from '../../data/dashboardMockData'

export default function InternsPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'Tous' | 'PFE' | 'PFC'>('Tous')
  const [statusFilter, setStatusFilter] = useState<'Tous' | 'En cours' | 'Terminé'>('Tous')
 const [selected, setSelected] =
useState<SupervisorIntern | null>(null)

  const filtered = supervisorInternsDetailed.filter((intern) => {
    const matchesSearch = intern.name.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'Tous' || intern.type === typeFilter
    const matchesStatus = statusFilter === 'Tous' || intern.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mes stagiaires</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un stagiaire" className="h-10 rounded-2xl pl-11 shadow-sm" />
        </div>
        <div className="flex gap-2">
          {(['Tous', 'PFE', 'PFC'] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTypeFilter(t)}
              className={cn('rounded-lg border px-3 py-1.5 text-xs font-bold', typeFilter === t ? 'border-[rgb(var(--intern-navy))] bg-[rgb(var(--intern-navy))] text-white' : 'hover:bg-muted')}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(['Tous', 'En cours', 'Terminé'] as const).map((s) => (
            <button key={s} type="button" onClick={() => setStatusFilter(s)}
              className={cn('rounded-lg border px-3 py-1.5 text-xs font-bold', statusFilter === s ? 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))]' : 'hover:bg-muted')}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <Card className="mb-6 rounded-3xl p-6 shadow-retool-md">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--intern-soft-blue))] text-lg font-black text-[rgb(var(--intern-navy))]">
                {selected.name.split(' ').map((p: string) => p[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="text-lg font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{selected.name}</p>
                <p className="text-sm text-muted-foreground">{selected.email} · {selected.phone}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-lg" onClick={() => setSelected(null)}>Fermer</Button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Profil</p>
              <p className="mt-2 text-sm text-foreground">Formation : {selected.formation}</p>
              <p className="text-sm text-foreground">Type : <Badge variant="outline" className="rounded-full">{selected.type}</Badge></p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Stage</p>
              <p className="mt-2 text-sm text-foreground">Entreprise : {selected.company}</p>
              <p className="text-sm text-foreground">Sujet : {selected.project}</p>
              <p className="text-sm text-foreground">Du {selected.startDate} au {selected.endDate}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Projet</p>
            <p className="mt-2 text-sm text-muted-foreground">{selected.description}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selected.objectives.map((o: string) => <Badge key={o} variant="outline" className="rounded-full">{o}</Badge>)}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selected.technologies.map((t: string) => <Badge key={t} className="rounded-full bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy))]">{t}</Badge>)}
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Progression</span>
              <span>{selected.progress}%</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-[rgb(var(--intern-blue))]" style={{ width: `${selected.progress}%` }} />
            </div>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            Suivi complet (activités, tâches, rapports, documents, rendez-vous, messages) accessible depuis les onglets du menu.
          </p>
        </Card>
      )}

      <Card className="overflow-x-auto rounded-3xl p-2 shadow-retool-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="p-4">Stagiaire</th>
              <th className="p-4">Projet</th>
              <th className="p-4">Type</th>
              <th className="p-4">Début</th>
              <th className="p-4">Fin</th>
              <th className="p-4">Progression</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((intern) => (
              <tr key={intern.id} className="border-b last:border-0">
                <td className="p-4 font-bold text-foreground">{intern.name}</td>
                <td className="p-4 text-muted-foreground">{intern.project}</td>
                <td className="p-4"><Badge variant="outline" className="rounded-full">{intern.type}</Badge></td>
                <td className="p-4 text-muted-foreground">{intern.startDate}</td>
                <td className="p-4 text-muted-foreground">{intern.endDate}</td>
                <td className="p-4 text-muted-foreground">{intern.progress}%</td>
                <td className="p-4">
                  <Button size="sm" variant="outline" className="rounded-lg" onClick={() => setSelected(intern)}>Voir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  )
}