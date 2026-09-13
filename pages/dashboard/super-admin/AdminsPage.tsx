import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { companyAdmins } from '../../data/dashboardMockData'

export default function AdminsPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Administrateurs</h1>
        <p className="mt-2 text-sm text-muted-foreground">Tous les administrateurs d'entreprise.</p>
      </div>

      <Card className="overflow-x-auto rounded-3xl p-2 shadow-retool-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="p-4">Nom</th>
              <th className="p-4">Email</th>
              <th className="p-4">Entreprise</th>
              <th className="p-4">Créé le</th>
              <th className="p-4">Statut</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companyAdmins.map((admin) => (
              <tr key={admin.id} className="border-b last:border-0">
                <td className="p-4 font-bold text-foreground">{admin.name}</td>
                <td className="p-4 text-muted-foreground">{admin.email}</td>
                <td className="p-4 text-muted-foreground">{admin.company}</td>
                <td className="p-4 text-muted-foreground">{admin.createdAt}</td>
                <td className="p-4">
                  <Badge
                    className={
                      admin.status === 'Actif'
                        ? 'rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                        : 'rounded-full bg-red-100 text-red-700 hover:bg-red-100'
                    }
                  >
                    {admin.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-lg">Voir profil</Button>
                    <Button size="sm" variant="outline" className="rounded-lg">
                      {admin.status === 'Actif' ? 'Désactiver' : 'Activer'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  )
}