import { Card } from '../../../lib/shadcn/card'
import { companyAdminDashboardStats, stageStatusBreakdown, monthlyRequests } from '../../data/dashboardMockData'

export default function DashboardTab() {
  const totalStatus = stageStatusBreakdown.reduce((sum, s) => sum + s.count, 0)
  const maxMonthly = Math.max(...monthlyRequests.map((m) => m.count), 1)

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Tableau de bord</h1>
        <p className="mt-2 text-sm text-muted-foreground">Statistiques détaillées de votre entreprise.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {companyAdminDashboardStats.map((s) => (
          <Card key={s.label} className="rounded-2xl p-4 shadow-retool-sm">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Répartition PFE / PFC</h2>
          <div className="mt-5 space-y-3">
            <div>
              <div className="flex justify-between text-sm"><span>PFE</span><span>60%</span></div>
              <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-muted"><div className="h-full w-[60%] rounded-full bg-[rgb(var(--intern-blue))]" /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm"><span>PFC</span><span>40%</span></div>
              <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-muted"><div className="h-full w-[40%] rounded-full bg-[rgb(var(--intern-navy))]" /></div>
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Stages par statut</h2>
          <div className="mt-5 space-y-2">
            {stageStatusBreakdown.map((s) => (
              <div key={s.label} className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">{s.label}</span>
                <span className="text-muted-foreground">{s.count} ({Math.round((s.count / totalStatus) * 100)}%)</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Évolution des demandes</h2>
        <div className="mt-6 flex h-40 items-end justify-around gap-4 border-b border-l pb-0 pl-2">
          {monthlyRequests.map((m) => (
            <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-bold text-[rgb(var(--intern-navy))] dark:text-foreground">{m.count}</span>
              <div className="flex w-full flex-1 items-end">
                <div className="w-full rounded-t-lg bg-[rgb(var(--intern-blue))]" style={{ height: `${(m.count / maxMonthly) * 100}%` }} />
              </div>
              <span className="text-xs font-semibold text-muted-foreground">{m.month}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}