import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { cn } from '../../../lib/shadcn/utils'
import { internActivities } from '../../data/dashboardMockData'
import type { InternActivity } from '../../data/dashboardMockData'

const statusColors: Record<InternActivity['status'], string> = {
  'En attente': 'text-amber-600',
  'En cours de validation': 'text-blue-600',
  Validée: 'text-emerald-600',
  Refusée: 'text-red-600',
}

export default function MyActivitiesPage() {
  const supervisorActivities = internActivities.filter((a) => a.source === 'supervisor')

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mes activités</h1>
        <p className="mt-2 text-sm text-muted-foreground">Activités assignées par votre encadrant.</p>
      </div>

      <div className="space-y-3">
        {supervisorActivities.map((a) => (
          <Card key={a.id} className="rounded-2xl p-4 shadow-retool-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-foreground">{a.title}</p>
                <p className="text-sm text-muted-foreground">{a.category} · {a.date} · {a.duration}</p>
                {a.description && <p className="mt-1 text-xs text-muted-foreground">{a.description}</p>}
              </div>
              <Badge variant="outline" className={cn('rounded-full', statusColors[a.status])}>{a.status}</Badge>
            </div>
          </Card>
        ))}
        {supervisorActivities.length === 0 && (
          <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
            Aucune activité assignée pour le moment.
          </Card>
        )}
      </div>
    </>
  )
}