import { useEffect, useState } from 'react'
import { Card } from '../../../lib/shadcn/card'
import { BarBreakdown } from '../shared/StatCharts'
import { getInternStatistics, type InternStatistics } from '../../../services/statistics'

const countLabels: Record<string, string> = {
  total_tasks: 'Tâches',
  completed_tasks: 'Terminées',
  total_documents: 'Documents',
  total_appointments: 'Rendez-vous',
}

function daysBetween(start: string, end: string) {
  return Math.max(0, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000))
}

function daysRemaining(end: string) {
  return Math.max(0, Math.round((new Date(end).getTime() - Date.now()) / 86400000))
}

export default function DashboardTab() {
  const [stats, setStats] = useState<InternStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getInternStatistics()
      .then((res) => setStats(res.statistics))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-sm text-muted-foreground">Chargement...</p>
  if (error) return <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>
  if (!stats) return null

  const totalTasks = Number(stats.internCounts.total_tasks)
  const completedTasks = Number(stats.internCounts.completed_tasks)
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  const totalDays = daysBetween(stats.progress.start_date, stats.progress.end_date)
  const remaining = daysRemaining(stats.progress.end_date)

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Tableau de bord</h1>
        <p className="mt-2 text-sm text-muted-foreground">Vue statistique complète de votre stage.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="rounded-2xl p-4 text-center shadow-retool-sm">
          <p className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{totalDays} jours</p>
          <p className="mt-1 text-xs text-muted-foreground">Durée du stage</p>
        </Card>
        <Card className="rounded-2xl p-4 text-center shadow-retool-sm">
          <p className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{progressPercent}%</p>
          <p className="mt-1 text-xs text-muted-foreground">Progression</p>
        </Card>
        {Object.entries(stats.internCounts).map(([key, value]) => (
          <Card key={key} className="rounded-2xl p-4 text-center shadow-retool-sm">
            <p className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{countLabels[key] ?? key}</p>
          </Card>
        ))}
        <Card className="rounded-2xl p-4 text-center shadow-retool-sm">
          <p className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{remaining}</p>
          <p className="mt-1 text-xs text-muted-foreground">Jours restants</p>
        </Card>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm">
          <span className="font-semibold text-foreground">Progression des tâches</span>
          <span className="text-muted-foreground">{progressPercent}%</span>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-[rgb(var(--intern-blue))]" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
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
          <BarBreakdown title="Documents par type" data={stats.documentsByType.map((c) => ({ label: c.type, count: Number(c.count) }))} />
        </Card>
        <Card className="rounded-3xl p-6 shadow-retool-sm lg:col-span-2">
          <BarBreakdown title="Rendez-vous par statut" data={stats.appointmentsByStatus.map((c) => ({ label: c.status, count: Number(c.count) }))} />
        </Card>
      </div>
    </>
  )
}