import { Search } from 'lucide-react'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { companies } from '../../data/internPilotData'

export default function CompaniesPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Entreprises</h1>
        <p className="mt-2 text-sm text-muted-foreground">Toutes les entreprises inscrites sur la plateforme.</p>
      </div>

      <div className="relative mb-5 max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Rechercher une entreprise..." className="h-10 rounded-2xl pl-11 shadow-sm" />
      </div>

      <Card className="overflow-x-auto rounded-3xl p-2 shadow-retool-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="p-4">Nom</th>
              <th className="p-4">Responsable</th>
              <th className="p-4">Email</th>
              <th className="p-4">Stagiaires</th>
              <th className="p-4">Encadrants</th>
              <th className="p-4">Statut</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="border-b last:border-0">
                <td className="p-4 font-bold text-foreground">{company.name}</td>
                <td className="p-4 text-muted-foreground">—</td>
                <td className="p-4 text-muted-foreground">{company.company_email}</td>
                <td className="p-4 text-muted-foreground">{company.interns_count}</td>
                <td className="p-4 text-muted-foreground">{company.supervisors_count}</td>
                <td className="p-4">
                  <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Actif</Badge>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-lg">Voir</Button>
                    <Button size="sm" variant="outline" className="rounded-lg">Désactiver</Button>
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