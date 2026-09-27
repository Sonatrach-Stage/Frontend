import { useEffect, useState } from 'react'
import { Card } from '../../../lib/shadcn/card'
import { BarBreakdown, MonthlyBarChart } from '../shared/StatCharts'
import { getCompanyAdminStatistics, type CompanyAdminStatistics } from '../../../services/statistics'

const countLabels: Record<string, string> = {
  total_interns: 'Stagiaires',
  waiting_interns: 'En attente',
  assigned_interns: 'Affectés',
  total_supervisors: 'Encadrants',
  total_pfe: 'PFE',
  total_pfc: 'PFC',
  total_tasks: 'Tâches',
  total_documents: 'Documents',
  total_appointments: 'Rendez-vous',
}

export default function DashboardTab() {
  const [stats, setStats] = useState<CompanyAdminStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCompanyAdminStatistics()
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
        <p className="mt-2 text-sm text-muted-foreground">Statistiques détaillées de votre entreprise.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Object.entries(stats.companyCounts).map(([key, value]) => (
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
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Charge par encadrant</h2>
        <div className="mt-4 space-y-2">
          {stats.supervisorWorkload.map((s) => (
            <div key={s.supervisor_id} className="flex items-center justify-between rounded-xl border bg-background/70 p-3 text-sm">
              <span className="font-semibold text-foreground">{s.supervisor_name}</span>
              <span className="text-muted-foreground">{s.intern_count} stagiaire(s)</span>
            </div>
          ))}
          {stats.supervisorWorkload.length === 0 && <p className="text-sm text-muted-foreground">Aucune donnée.</p>}
        </div>
      </Card>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <MonthlyBarChart
          title="Croissance des stages"
          series={stats.internshipGrowth.map((g) => ({ month: g.month, values: [{ label: 'Stagiaires', count: Number(g.interns) }] }))}
        />
      </Card>
    </>
  )
}