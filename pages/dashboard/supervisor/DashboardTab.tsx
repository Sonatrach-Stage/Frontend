import { Card } from '../../../lib/shadcn/card'
import { supervisorStats, supervisorInterns, supervisorReports } from '../../data/dashboardMockData'

export default function DashboardTab() {
  const validated = supervisorReports.filter((r) => r.status === 'Validé').length

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Tableau de bord</h1>
        <p className="mt-2 text-sm text-muted-foreground">Vue statistique de vos stagiaires et rapports.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {supervisorStats.map((stat) => (
          <Card key={stat.label} className="rounded-3xl p-5 shadow-retool-sm">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-3 text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Progression moyenne</h2>
          <div className="mt-5 space-y-4">
            {supervisorInterns.map((intern) => (
              <div key={intern.name}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-foreground">{intern.name}</span>
                  <span className="text-muted-foreground">{intern.progress}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-[rgb(var(--intern-blue))]" style={{ width: `${intern.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Rapports</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            {validated} sur {supervisorReports.length} rapports validés
          </p>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${(validated / supervisorReports.length) * 100}%` }}
            />
          </div>
        </Card>
      </div>
    </>
  )
}