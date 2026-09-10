import { Building2, ClipboardList, FolderOpen, GraduationCap, FileText, Users, UserCog } from 'lucide-react'
import { Card } from '../../lib/shadcn/card'
import { Badge } from '../../lib/shadcn/badge'
import { Button } from '../../lib/shadcn/button'
import { superAdminStats, registrationRequests } from '../data/dashboardMockData'
import { getCurrentUser } from '../../lib/auth'

export default function SuperAdminHome() {
  const user = getCurrentUser()

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
          Bienvenue dans l'administration 👋
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Vue globale sur toutes les entreprises, stagiaires et encadrants.
        </p>
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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
            🚨 Demandes d'inscription
          </h2>
          <Badge className="bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-navy))] dark:bg-secondary dark:text-foreground">
            {registrationRequests.length} en attente
          </Badge>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-3 pr-4">Entreprise</th>
                <th className="pb-3 pr-4">Responsable</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Statut</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrationRequests.map((request) => (
                <tr key={request.company} className="border-b last:border-0">
                  <td className="py-3 pr-4 font-bold text-foreground">{request.company}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{request.responsible}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{request.date}</td>
                  <td className="py-3 pr-4">
                    <Badge variant="outline" className="rounded-full text-amber-600">
                      🟡 {request.status}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <Button size="sm" className="rounded-lg bg-[rgb(var(--intern-navy))] text-white">
                        Accepter
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        Refuser
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {user ? (
        <p className="mt-6 text-xs text-muted-foreground">Connecté en tant que {user.name}</p>
      ) : null}
    </>
  )
}