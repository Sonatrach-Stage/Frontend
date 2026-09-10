import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { companyAdminStats, supervisorInterns } from '../../data/dashboardMockData'

export default function DashboardTab() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Tableau de bord</h1>
        <p className="mt-2 text-sm text-muted-foreground">Vue statistique de l'activité de votre entreprise.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {companyAdminStats.map((stat) => (
          <Card key={stat.label} className="rounded-3xl p-5 shadow-retool-sm">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-3 text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Progression des stages en cours</h2>
        <div className="mt-5 space-y-4">
          {supervisorInterns.map((intern) => (
            <div key={intern.name}>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-foreground">{intern.name}</span>
                <Badge variant="outline" className="rounded-full">{intern.progress}%</Badge>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-[rgb(var(--intern-blue))]" style={{ width: `${intern.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}