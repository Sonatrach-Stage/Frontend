import { Card } from '../../../lib/shadcn/card'
import { superAdminStats } from '../../data/dashboardMockData'

export default function DashboardTab() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Tableau de bord</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {superAdminStats.map((stat) => (
          <Card key={stat.label} className="rounded-3xl p-5 shadow-retool-sm">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-3 text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Répartition PFE / PFC</h2>
        <p className="mt-4 text-sm text-muted-foreground">
          
        </p>
      </Card>
    </>
  )
}