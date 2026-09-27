import { useEffect, useState } from 'react'
import { Badge } from '../../../lib/shadcn/badge'
import { Card } from '../../../lib/shadcn/card'
import { cn } from '../../../lib/shadcn/utils'
import { getActiveInterns, getDeactivatedInterns, type ActiveIntern } from '../../../services/adminsec'

export default function InternsPage() {
  const [tab, setTab] = useState<'Actifs' | 'Désactivés'>('Actifs')
  const [interns, setInterns] = useState<ActiveIntern[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  function loadInterns(currentTab: 'Actifs' | 'Désactivés') {
    setLoading(true)
    setError('')
    const request = currentTab === 'Actifs' ? getActiveInterns() : getDeactivatedInterns()
    request
      .then((res) => setInterns('actinterns' in res ? res.actinterns : res.desinterns))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadInterns(tab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mes stagiaires</h1>
        <p className="mt-2 text-sm text-muted-foreground">Tous les stagiaires de votre entreprise.</p>
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
        <Card className="overflow-x-auto rounded-3xl p-2 shadow-retool-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="p-4">Nom</th>
                <th className="p-4">Email</th>
                <th className="p-4">Type</th>
                <th className="p-4">Secteur</th>
                <th className="p-4">Établissement</th>
                <th className="p-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern) => (
                <tr key={intern.email} className="border-b last:border-0">
                  <td className="p-4 font-bold text-foreground">{intern.name}</td>
                  <td className="p-4 text-muted-foreground">{intern.email}</td>
                  <td className="p-4"><Badge variant="outline" className="rounded-full">{intern.intern_type}</Badge></td>
                  <td className="p-4 text-muted-foreground">{intern.sector}</td>
                  <td className="p-4 text-muted-foreground">{intern.establishment}</td>
                  <td className="p-4">
                    <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{intern.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {interns.length === 0 && (
            <p className="p-8 text-center text-sm text-muted-foreground">Aucun stagiaire dans cette catégorie.</p>
          )}
        </Card>
      )}
    </>
  )
}