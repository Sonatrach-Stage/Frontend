import { useEffect, useState } from 'react'
import { Search, Trash2 } from 'lucide-react'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { getAllCompanies, approveCompany, rejectCompany, deleteCompany, type ApiCompany } from '../../../api/adminsup'

const statusColor: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
  APPROVED: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
  REJECTED: 'bg-red-100 text-red-700 hover:bg-red-100',
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<ApiCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [busyId, setBusyId] = useState<number | null>(null)

  function loadCompanies() {
    setLoading(true)
    getAllCompanies()
      .then((res) => setCompanies(res.companies))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadCompanies()
  }, [])

  const filtered = companies.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  async function handleApprove(id: number) {
    setBusyId(id)
    setError('')
    try {
      await approveCompany(id)
      loadCompanies()
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
      loadCompanies()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du rejet')
    } finally {
      setBusyId(null)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer cette entreprise ? Cette action est irréversible.')) return
    setBusyId(id)
    setError('')
    try {
      await deleteCompany(id)
      setCompanies((current) => current.filter((c) => c.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Entreprises</h1>
        <p className="mt-2 text-sm text-muted-foreground">Toutes les entreprises inscrites sur la plateforme.</p>
      </div>

      <div className="relative mb-5 max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une entreprise..." className="h-10 rounded-2xl pl-11 shadow-sm" />
      </div>

      {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
      {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

      {!loading && (
        <Card className="overflow-x-auto rounded-3xl p-2 shadow-retool-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="p-4">Nom</th>
                <th className="p-4">Email</th>
                <th className="p-4">Téléphone</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((company) => (
                <tr key={company.id} className="border-b last:border-0">
                  <td className="p-4 font-bold text-foreground">{company.name}</td>
                  <td className="p-4 text-muted-foreground">{company.company_email}</td>
                  <td className="p-4 text-muted-foreground">{company.company_phone}</td>
                  <td className="p-4">
                    <Badge className={`rounded-full ${statusColor[company.company_status] ?? ''}`}>{company.company_status}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {company.company_status === 'pending' && (
                        <>
                          <Button size="sm" disabled={busyId === company.id} className="rounded-lg bg-[rgb(var(--intern-navy))] text-white" onClick={() => handleApprove(company.id)}>
                            Approuver
                          </Button>
                          <Button size="sm" variant="outline" disabled={busyId === company.id} className="rounded-lg text-red-600" onClick={() => handleReject(company.id)}>
                            Rejeter
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" disabled={busyId === company.id} className="rounded-lg text-red-600" onClick={() => handleDelete(company.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="p-8 text-center text-sm text-muted-foreground">Aucune entreprise trouvée.</p>
          )}
        </Card>
      )}
    </>
  )
}