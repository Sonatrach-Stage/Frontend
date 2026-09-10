import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { internshipRequests } from '../../data/dashboardMockData'

export default function RequestsPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Demandes de stage</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Après acceptation, affectez un encadrant depuis la page Affectations.
        </p>
      </div>

      <div className="space-y-4">
        {internshipRequests.map((req) => (
          <Card key={req.name} className="rounded-2xl p-5 shadow-retool-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgb(var(--intern-soft-blue))] font-black text-[rgb(var(--intern-navy))]">
                  {req.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-foreground">{req.name}</p>
                  <p className="text-sm text-muted-foreground">{req.formation} · {req.type} · Début {req.startDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-full text-amber-600">🟡 {req.status}</Badge>
                <Button size="sm" variant="outline" className="rounded-lg">Voir détails</Button>
                <Button size="sm" className="rounded-lg bg-[rgb(var(--intern-navy))] text-white">Accepter</Button>
                <Button size="sm" variant="outline" className="rounded-lg text-red-600">Refuser</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}