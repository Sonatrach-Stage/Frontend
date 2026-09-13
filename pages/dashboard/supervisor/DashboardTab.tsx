import { Card } from '../../../lib/shadcn/card'
import { supervisorDashboardStats, supervisorProgressChart, supervisorActivityFeed } from '../../data/dashboardMockData'

export default function DashboardTab() {
  const maxProgress = 100

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Tableau de bord</h1>
        <p className="mt-2 text-sm text-muted-foreground">Vue statistique détaillée de vos stagiaires.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {supervisorDashboardStats.map((stat) => (
          <Card key={stat.label} className="rounded-3xl p-5 shadow-retool-sm">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-3 text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Progression des stages</h2>
          <div className="mt-8 flex h-56 items-end justify-around gap-4 border-b border-l pb-0 pl-2">
            {supervisorProgressChart.map((item) => (
              <div key={item.name} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-bold text-[rgb(var(--intern-navy))] dark:text-foreground">{item.progress}%</span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg bg-[rgb(var(--intern-blue))]"
                    style={{ height: `${(item.progress / maxProgress) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Activité récente</h2>
          <div className="mt-5 space-y-3">
            {supervisorActivityFeed.map((item, i) => (
              <div key={i} className="rounded-xl border bg-background/70 p-3 text-sm text-foreground">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}