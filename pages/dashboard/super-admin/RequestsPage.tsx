import { useState } from 'react'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { cn } from '../../../lib/shadcn/utils'
import { companyRequests as initial, type CompanyRequest } from '../../data/dashboardMockData'

export default function RequestsPage() {
  const [requests, setRequests] = useState<CompanyRequest[]>(initial)

  function accept(id: number) {
    setRequests((cur) => cur.map((r) => (r.id === id ? { ...r, status: 'Acceptée' } : r)))
  }
  function refuse(id: number) {
    setRequests((cur) => cur.map((r) => (r.id === id ? { ...r, status: 'Refusée' } : r)))
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Demandes</h1>
        <p className="mt-2 text-sm text-muted-foreground">Demandes d'ouverture d'espace entreprise.</p>
      </div>

      <div className="space-y-3">
        {requests.map((req) => (
          <Card key={req.id} className="rounded-2xl p-5 shadow-retool-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-bold text-foreground">{req.company}</p>
                <p className="text-sm text-muted-foreground">Responsable : {req.responsible} · {req.date}</p>
              </div>
              {req.status === 'En attente' ? (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-lg">Voir détails</Button>
                  <Button size="sm" className="rounded-lg bg-[rgb(var(--intern-navy))] text-white" onClick={() => accept(req.id)}>Accepter</Button>
                  <Button size="sm" variant="outline" className="rounded-lg text-red-600" onClick={() => refuse(req.id)}>Refuser</Button>
                </div>
              ) : (
                <Badge className={cn('rounded-full', req.status === 'Acceptée' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-red-100 text-red-700 hover:bg-red-100')}>
                  {req.status}
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}