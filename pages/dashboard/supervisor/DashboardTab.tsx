import { useEffect, useState } from 'react'
import { Card } from '../../../lib/shadcn/card'
import { BarBreakdown, MonthlyBarChart } from '../shared/StatCharts'
import { getSupervisorStatistics, type SupervisorStatistics } from '../../../services/statistics'

const countLabels: Record<string, string> = {
  total_interns: 'Stagiaires',
  active_interns: 'Actifs',
  total_tasks: 'Tâches',
  total_activities: 'Activités',
  total_documents: 'Documents',
  total_appointments: 'Rendez-vous',
}

export default function DashboardTab() {
  const [stats, setStats] = useState<SupervisorStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getSupervisorStatistics()
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
        <p className="mt-2 text-sm text-muted-foreground">Vue statistique détaillée de vos stagiaires.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {Object.entries(stats.supervisorCounts).map(([key, value]) => (
          <Card key={key} className="rounded-2xl p-4 shadow-retool-sm">
            <p className="text-xs text-muted-foreground">{countLabels[key] ?? key}</p>
            <p className="mt-2 text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <BarBreakdown title="Stagiaires par statut" data={stats.internsByStatus.map((c) => ({ label: c.status, count: Number(c.count) }))} />
        </Card>
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <BarBreakdown title="PFE / PFC" data={stats.internsByType.map((c) => ({ label: c.type, count: Number(c.count) }))} />
        </Card>
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <BarBreakdown title="Tâches par statut" data={stats.tasksByStatus.map((c) => ({ label: c.status, count: Number(c.count) }))} />
        </Card>
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <BarBreakdown title="Tâches par priorité" data={stats.tasksByPriority.map((c) => ({ label: c.priority, count: Number(c.count) }))} />
        </Card>
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <BarBreakdown title="Documents par statut" data={stats.documentsByStatus.map((c) => ({ label: c.status, count: Number(c.count) }))} />
        </Card>
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <BarBreakdown title="Rendez-vous par statut" data={stats.appointmentsByStatus.map((c) => ({ label: c.status, count: Number(c.count) }))} />
        </Card>
      </div>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <MonthlyBarChart
          title="Activités par mois"
          series={stats.activities.map((a) => ({ month: a.month, values: [{ label: 'Activités', count: Number(a.activities) }] }))}
        />
      </Card>
    </>
  )
}