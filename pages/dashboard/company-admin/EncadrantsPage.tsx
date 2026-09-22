import { useEffect, useState } from 'react'
import { Card } from '../../../lib/shadcn/card'
import { cn } from '../../../lib/shadcn/utils'
import { getActiveSupervisors, getDeactivatedSupervisors, type ActiveSupervisor } from '../../../api/adminsec'

export default function EncadrantsPage() {
  const [tab, setTab] = useState<'Actifs' | 'Désactivés'>('Actifs')
  const [supervisors, setSupervisors] = useState<ActiveSupervisor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  function loadSupervisors(currentTab: 'Actifs' | 'Désactivés') {
    setLoading(true)
    setError('')
    const request = currentTab === 'Actifs' ? getActiveSupervisors() : getDeactivatedSupervisors()
    request
      .then((res) => setSupervisors('actinterns' in res ? res.actinterns : res.desinterns))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadSupervisors(tab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Encadrants</h1>
        <p className="mt-2 text-sm text-muted-foreground">Tous les encadrants de votre entreprise.</p>
      </div>

      <div className="mb-5 flex gap-2">
        {(['Actifs', 'Désactivés'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'rounded-xl border px-4 py-2 text-sm font-semibold transition-colors',
              tab === t ? 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))]' : 'hover:bg-muted',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
      {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {supervisors.map((sup) => (
            <Card key={sup.email} className="rounded-2xl p-5 shadow-retool-sm">
              <p className="font-bold text-foreground">{sup.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{sup.email}</p>
              <p className="mt-1 text-sm text-muted-foreground">{sup.job} · {sup.department}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {sup.specialization} · {sup.years_of_experience} ans d'expérience
              </p>
            </Card>
          ))}
          {supervisors.length === 0 && (
            <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground md:col-span-2 xl:col-span-3">
              Aucun encadrant dans cette catégorie.
            </Card>
          )}
        </div>
      )}
    </>
  )
}