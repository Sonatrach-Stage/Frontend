import { Card } from '../../lib/shadcn/card'
import { Badge } from '../../lib/shadcn/badge'
import { supervisorStats, supervisorInterns, supervisorReports, supervisorAlert } from '../data/dashboardMockData'
import { getCurrentUser } from '../../lib/auth'

export default function SupervisorHome() {
  const user = getCurrentUser()

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
          Bonjour, {user?.name ?? 'Encadrant'} 👋
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Voici un aperçu de vos stagiaires et de leurs activités.
        </p>
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
          <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Progression des stagiaires</h2>
          <div className="mt-5 space-y-4">
            {supervisorInterns.map((intern) => (
              <div key={intern.name}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-foreground">{intern.name}</span>
                  <span className="text-muted-foreground">{intern.progress}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-[rgb(var(--intern-blue))]"
                    style={{ width: `${intern.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-semibold text-amber-700">
            ⚠️ {supervisorAlert}
          </div>
        </Card>

        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Rapports récents</h2>
          <div className="mt-5 space-y-3">
            {supervisorReports.map((report) => (
              <div key={report.title} className="flex items-center justify-between rounded-2xl border bg-background/70 p-4">
                <p className="font-semibold text-foreground">{report.title}</p>
                <Badge variant="outline" className="rounded-full">
                  {report.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}