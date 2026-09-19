import { useEffect, useState } from 'react'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { getSupervisors, activateSupervisor, deactivateSupervisor, type CompanySupervisor } from '../../../api/adminsec'

export default function EncadrantsPage() {
  const [supervisors, setSupervisors] = useState<CompanySupervisor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actingId, setActingId] = useState<number | null>(null)

  function loadSupervisors() {
    setLoading(true)
    getSupervisors()
      .then((res) => setSupervisors(res.supervisors))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadSupervisors()
  }, [])

  async function handleActivate(superId: number) {
    setActingId(superId)
    setError('')
    try {
      await activateSupervisor(superId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setActingId(null)
    }
  }

  async function handleDeactivate(superId: number) {
    setActingId(superId)
    setError('')
    try {
      await deactivateSupervisor(superId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setActingId(null)
    }
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Encadrants</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
      {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

      {!loading && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {supervisors.map((sup) => (
            <Card key={sup.id} className="rounded-2xl p-5 shadow-retool-sm">
              <p className="font-bold text-foreground">Encadrant #{sup.id}</p>
              <p className="mt-1 text-sm text-muted-foreground">{sup.job} · {sup.department}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {sup.specialization} · {sup.years_of_experience} ans d'expérience
              </p>
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  disabled={actingId === sup.id}
                  className="rounded-lg bg-[rgb(var(--intern-navy))] text-white"
                  onClick={() => handleActivate(sup.id)}
                >
                  Activer
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={actingId === sup.id}
                  className="rounded-lg text-red-600"
                  onClick={() => handleDeactivate(sup.id)}
                >
                  Désactiver
                </Button>
              </div>
            </Card>
          ))}
          {supervisors.length === 0 && (
            <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground md:col-span-2 xl:col-span-3">
              Aucun encadrant pour le moment.
            </Card>
          )}
        </div>
      )}
    </>
  )
}