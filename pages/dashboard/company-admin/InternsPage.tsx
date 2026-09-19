import { useEffect, useState } from 'react'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { getAllInterns, activateIntern, deactivateIntern, type CompanyIntern } from '../../../api/adminsec'

export default function InternsPage() {
  const [interns, setInterns] = useState<CompanyIntern[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actingId, setActingId] = useState<number | null>(null)

  function loadInterns() {
    setLoading(true)
    getAllInterns()
      .then((res) => setInterns(res.interns))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadInterns()
  }, [])

  async function toggleStatus(intern: CompanyIntern) {
    setActingId(intern.id)
    setError('')
    try {
      if (intern.status === 'active') {
        await deactivateIntern(intern.id)
      } else {
        await activateIntern(intern.id)
      }
      loadInterns()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setActingId(null)
    }
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mes stagiaires</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
      {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

      {!loading && (
        <Card className="overflow-x-auto rounded-3xl p-2 shadow-retool-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="p-4">ID</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Convention</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern) => (
                <tr key={intern.id} className="border-b last:border-0">
                  <td className="p-4 font-bold text-foreground">#{intern.id}</td>
                  <td className="p-4">
                    <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{intern.status}</Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">{intern.con_status}</td>
                  <td className="p-4">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={actingId === intern.id}
                      className="rounded-lg"
                      onClick={() => toggleStatus(intern)}
                    >
                      {intern.status === 'active' ? 'Désactiver' : 'Activer'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {interns.length === 0 && (
            <p className="p-8 text-center text-sm text-muted-foreground">Aucun stagiaire pour le moment.</p>
          )}
        </Card>
      )}
    </>
  )
}