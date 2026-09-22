import { useState } from 'react'
import { Badge } from '../../../lib/shadcn/badge'
import { Card } from '../../../lib/shadcn/card'
import { allInterns } from '../../data/dashboardMockData'
import { cn } from '../../../lib/shadcn/utils'
import { supervisorInternsDetailed, type SupervisorIntern } from '../../data/dashboardMockData'

export default function InternsPage() {
  const [typeFilter, setTypeFilter] = useState<'all' | 'PFE' | 'PFC'>('all')

  const filtered = allInterns.filter((i) => typeFilter === 'all' || i.type === typeFilter)

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Stagiaires</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
      </div>

      <div className="mb-5 flex gap-2">
        {(['all', 'PFE', 'PFC'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setTypeFilter(f)}
            className={cn(
              'rounded-xl border px-4 py-2 text-sm font-semibold transition-colors',
              typeFilter === f ? 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))]' : 'hover:bg-muted',
            )}
          >
            {f === 'all' ? 'Tous' : f}
          </button>
        ))}
      </div>

      <Card className="overflow-x-auto rounded-3xl p-2 shadow-retool-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="p-4">Nom</th>
              <th className="p-4">Formation</th>
              <th className="p-4">Entreprise</th>
              <th className="p-4">Type</th>
              <th className="p-4">Encadrant</th>
              <th className="p-4">Progression</th>
              <th className="p-4">Statut</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((intern) => (
              <tr key={intern.id} className="border-b last:border-0">
                <td className="p-4 font-bold text-foreground">{intern.name}</td>
                <td className="p-4 text-muted-foreground">{intern.formation}</td>
                <td className="p-4 text-muted-foreground">{intern.company}</td>
                <td className="p-4">
                  <Badge variant="outline" className="rounded-full">{intern.type}</Badge>
                </td>
                <td className="p-4 text-muted-foreground">{intern.supervisor}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-[rgb(var(--intern-blue))]" style={{ width: `${intern.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{intern.progress}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <Badge
                    className={
                      intern.status === 'Terminé'
                        ? 'rounded-full bg-muted text-foreground hover:bg-muted'
                        : 'rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                    }
                  >
                    {intern.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  )
}