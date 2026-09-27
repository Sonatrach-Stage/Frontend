import { useEffect, useState } from 'react'
import { Card } from '../../../lib/shadcn/card'
import { BarBreakdown, MonthlyBarChart } from '../shared/StatCharts'
import { getSuperAdminStatistics, type SuperAdminStatistics } from '../../../services/statistics'

const countLabels: Record<string, string> = {
  total_companies: 'Entreprises',
  approved_companies: 'Approuvées',
  pending_companies: 'En attente',
  rejected_companies: 'Rejetées',
  total_interns: 'Stagiaires',
  total_supervisors: 'Encadrants',
  total_pfe: 'PFE',
  total_pfc: 'PFC',
  total_tasks: 'Tâches',
  total_documents: 'Documents',
  total_appointments: 'Rendez-vous',
}

export default function DashboardTab() {
  const [stats, setStats] = useState<SuperAdminStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getSuperAdminStatistics()
      .then((res) => setStats(res.statistics))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-sm text-muted-foreground">Chargement...</p>
  if (error) return <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>
  if (!stats) return null

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Tableau de bord</h1>
        <p className="mt-2 text-sm text-muted-foreground">Statistiques globales de la plateforme.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Object.entries(stats.globalCounts).map(([key, value]) => (
          <Card key={key} className="rounded-2xl p-4 shadow-retool-sm">
            <p className="text-xs text-muted-foreground">{countLabels[key] ?? key}</p>
            <p className="mt-2 text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <BarBreakdown title="Entreprises par statut" data={stats.companiesByStatus.map((c) => ({ label: c.status, count: Number(c.count) }))} />
        </Card>
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <BarBreakdown title="Stagiaires : PFE / PFC" data={stats.internsByType.map((c) => ({ label: c.type, count: Number(c.count) }))} />
        </Card>
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <BarBreakdown title="Tâches par statut" data={stats.tasksByStatus.map((c) => ({ label: c.status, count: Number(c.count) }))} />
        </Card>
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <BarBreakdown title="Documents par statut" data={stats.documentsByStatus.map((c) => ({ label: c.status, count: Number(c.count) }))} />
        </Card>
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <BarBreakdown title="Rendez-vous par statut" data={stats.appointmentsByStatus.map((c) => ({ label: c.status, count: Number(c.count) }))} />
        </Card>
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <BarBreakdown title="Tâches par priorité" data={stats.tasksByPriority.map((c) => ({ label: c.priority, count: Number(c.count) }))} />
        </Card>
      </div>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <MonthlyBarChart
          title="Évolution de la plateforme (entreprises, stagiaires, encadrants)"
          series={stats.platformGrowth.map((g) => ({
            month: g.month,
            values: [
              { label: 'Entreprises', count: Number(g.companies) },
              { label: 'Stagiaires', count: Number(g.interns) },
              { label: 'Encadrants', count: Number(g.supervisors) },
            ],
          }))}
        />
      </Card>
    </>
  )
}