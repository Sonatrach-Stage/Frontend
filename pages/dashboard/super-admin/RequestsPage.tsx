import { useEffect, useState } from 'react'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { getPendingCompanies, approveCompany, rejectCompany, type ApiCompany } from '../../../api/adminsup'

export default function RequestsPage() {
  const [companies, setCompanies] = useState<ApiCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<number | null>(null)

  function loadPending() {
    setLoading(true)
    getPendingCompanies()
      .then((res) => setCompanies(res.companies))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadPending()
  }, [])

  async function handleApprove(id: number) {
    setBusyId(id)
    setError('')
    try {
      await approveCompany(id)
      setCompanies((current) => current.filter((c) => c.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'approbation")
    } finally {
      setBusyId(null)
    }
  }

  async function handleReject(id: number) {
    setBusyId(id)
    setError('')
    try {
      await rejectCompany(id)
      setCompanies((current) => current.filter((c) => c.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du rejet')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Demandes</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
      {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

      {!loading && (
        <div className="space-y-3">
          {companies.map((company) => (
            <Card key={company.id} className="rounded-2xl p-5 shadow-retool-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-foreground">{company.name}</p>
                  <p className="text-sm text-muted-foreground">{company.company_email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full text-amber-600">🟡 {company.company_status}</Badge>
                  <Button size="sm" disabled={busyId === company.id} className="rounded-lg bg-[rgb(var(--intern-navy))] text-white" onClick={() => handleApprove(company.id)}>
                    Accepter
                  </Button>
                  <Button size="sm" variant="outline" disabled={busyId === company.id} className="rounded-lg text-red-600" onClick={() => handleReject(company.id)}>
                    Refuser
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {companies.length === 0 && (
            <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
              Aucune demande en attente.
            </Card>
          )}
        </div>
      )}
    </>
  )
}