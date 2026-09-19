import { useEffect, useState } from 'react'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { cn } from '../../../lib/shadcn/utils'
import { getPendingInterns, approveIntern, rejectIntern, type PendingIntern } from '../../../api/adminsec'

export default function ValidationsPage() {
  const [tab, setTab] = useState<'Stagiaire' | 'Encadrant'>('Stagiaire')
  const [interns, setInterns] = useState<PendingIntern[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actingId, setActingId] = useState<number | null>(null)

  function loadPending() {
    setLoading(true)
    getPendingInterns()
      .then((res) => setInterns(res.interns))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadPending()
  }, [])

  async function handleApprove(internId: number) {
    setActingId(internId)
    setError('')
    try {
      await approveIntern(internId)
      setInterns((current) => current.filter((i) => i.id !== internId))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'approbation")
    } finally {
      setActingId(null)
    }
  }

  async function handleReject(internId: number) {
    setActingId(internId)
    setError('')
    try {
      await rejectIntern(internId)
      setInterns((current) => current.filter((i) => i.id !== internId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du refus')
    } finally {
      setActingId(null)
    }
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Demandes de validation</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
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
            {t === 'Stagiaire' ? 'Stagiaires' : 'Encadrants'}
          </button>
        ))}
      </div>

      {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

      {tab === 'Stagiaire' ? (
        <>
          {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
          {!loading && (
            <div className="space-y-3">
              {interns.map((intern) => (
                <Card key={intern.id} className="rounded-2xl p-5 shadow-retool-sm">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-foreground">Stagiaire #{intern.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {intern.intern_type} · {intern.establishment} · {intern.studies_level}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Secteur : {intern.sector} · Du {intern.start_date} au {intern.end_date}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Convention : {intern.con_status}{' '}
                        <a href={intern.convention_url} target="_blank" rel="noreferrer" className="underline">
                          Voir le fichier
                        </a>
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className="rounded-full text-amber-600">🟡 {intern.status}</Badge>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          disabled={actingId === intern.id}
                          className="rounded-lg bg-[rgb(var(--intern-navy))] text-white"
                          onClick={() => handleApprove(intern.id)}
                        >
                          Accepter
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={actingId === intern.id}
                          className="rounded-lg text-red-600"
                          onClick={() => handleReject(intern.id)}
                        >
                          Refuser
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              {interns.length === 0 && (
                <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
                  Aucune demande en attente.
                </Card>
              )}
            </div>
          )}
        </>
      ) : (
        <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
          Aucune route disponible pour l'instant pour les demandes encadrant.
        </Card>
      )}
    </>
  )
}