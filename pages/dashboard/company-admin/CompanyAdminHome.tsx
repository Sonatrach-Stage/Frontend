import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { companyAdminStats, internshipRequests } from '../../data/dashboardMockData'
import { getCurrentUser } from '../../../lib/auth'

export default function CompanyAdminHome() {
  const user = getCurrentUser()

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
          Bienvenue, {user?.name ?? 'Administrateur'} 👋
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Gérez vos stagiaires, encadrants et stages depuis votre espace.
        </p>
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
        <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Demandes récentes</h2>
        <div className="mt-5 space-y-3">
          {internshipRequests.map((req) => (
            <div key={req.name} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-background/70 p-4">
              <div>
                <p className="font-bold text-foreground">{req.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {req.formation} · {req.type} · Début {req.startDate}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-full text-amber-600">🟡 {req.status}</Badge>
                <Button size="sm" className="rounded-lg bg-[rgb(var(--intern-navy))] text-white">Accepter</Button>
                <Button size="sm" variant="outline" className="rounded-lg">Refuser</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}