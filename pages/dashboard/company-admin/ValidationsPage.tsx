import { useState } from 'react'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { Input } from '../../../lib/shadcn/input'
import { cn } from '../../../lib/shadcn/utils'
import { accountValidationRequests as initial, type AccountValidationRequest } from '../../data/dashboardMockData'

export default function ValidationsPage() {
  const [requests, setRequests] = useState<AccountValidationRequest[]>(initial)
  const [tab, setTab] = useState<'Stagiaire' | 'Encadrant'>('Stagiaire')
  const [refusing, setRefusing] = useState<number | null>(null)
  const [reason, setReason] = useState('')

  const filtered = requests.filter((r) => r.role === tab)

  function accept(id: number) {
    setRequests((current) => current.map((r) => (r.id === id ? { ...r, status: 'Accepté' } : r)))
  }

  function confirmRefuse(id: number) {
    setRequests((current) => current.map((r) => (r.id === id ? { ...r, status: 'Refusé', refusalReason: reason || 'Demande non conforme' } : r)))
    setRefusing(null)
    setReason('')
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Demandes de validation</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Validez les nouveaux comptes stagiaire et encadrant. L'acceptation active le compte automatiquement.
        </p>
      </div>

      <div className="mb-5 flex gap-2">
        {(['Stagiaire', 'Encadrant'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'rounded-xl border px-4 py-2 text-sm font-semibold transition-colors',
              tab === t ? 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))]' : 'hover:bg-muted',
            )}
          >
            {t === 'Stagiaire' ? 'Stagiaires' : 'Encadrants'} ({requests.filter((r) => r.role === t && r.status === 'En attente').length})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((req) => (
          <Card key={req.id} className="rounded-2xl p-5 shadow-retool-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-bold text-foreground">{req.name}</p>
                <p className="text-sm text-muted-foreground">{req.email} · {req.phone}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {req.role === 'Stagiaire' ? `Stagiaire — ${req.type} · ${req.university}` : `Encadrant — ${req.fonction} · ${req.department}`}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Date de demande : {req.date}</p>
                {req.status === 'Refusé' && req.refusalReason && (
                  <p className="mt-2 rounded-lg bg-red-50 p-2 text-xs text-red-600">Motif du refus : {req.refusalReason}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {req.status === 'En attente' ? (
                  <>
                    <Button size="sm" variant="outline" className="rounded-lg">Voir le profil</Button>
                    <Button size="sm" className="rounded-lg bg-[rgb(var(--intern-navy))] text-white" onClick={() => accept(req.id)}>Accepter</Button>
                    <Button size="sm" variant="outline" className="rounded-lg text-red-600" onClick={() => setRefusing(req.id)}>Refuser</Button>
                  </>
                ) : (
                  <Badge className={cn('rounded-full', req.status === 'Accepté' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-red-100 text-red-700 hover:bg-red-100')}>
                    {req.status === 'Accepté' ? 'Compte activé' : 'Refusé'}
                  </Badge>
                )}
              </div>
            </div>

            {refusing === req.id && (
              <div className="mt-4 rounded-xl border bg-background/70 p-4">
                <label className="mb-2 block text-sm font-semibold text-foreground">Motif du refus</label>
                <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Ex. Informations incorrectes" className="h-10 rounded-xl" />
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="rounded-lg bg-red-600 text-white hover:bg-red-700" onClick={() => confirmRefuse(req.id)}>Confirmer le refus</Button>
                  <Button size="sm" variant="outline" className="rounded-lg" onClick={() => setRefusing(null)}>Annuler</Button>
                </div>
              </div>
            )}
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">Aucune demande pour le moment.</Card>
        )}
      </div>
    </>
  )
}