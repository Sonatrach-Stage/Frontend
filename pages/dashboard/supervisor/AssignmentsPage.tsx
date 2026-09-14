import { Badge } from '../../../lib/shadcn/badge'
import { Card } from '../../../lib/shadcn/card'
import { supervisorInternsDetailed } from '../../data/dashboardMockData'

export default function AssignmentsPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mes affectations</h1>
        <p className="mt-2 text-sm text-muted-foreground">
         
        </p>
      </div>

      <Card className="overflow-x-auto rounded-3xl p-2 shadow-retool-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="p-4">Stagiaire</th>
              <th className="p-4">Entreprise</th>
              <th className="p-4">Sujet</th>
              <th className="p-4">Type</th>
              <th className="p-4">Début</th>
              <th className="p-4">Fin</th>
              <th className="p-4">Statut</th>
            </tr>
          </thead>
          <tbody>
            {supervisorInternsDetailed.map((intern) => (
              <tr key={intern.id} className="border-b last:border-0">
                <td className="p-4 font-bold text-foreground">{intern.name}</td>
                <td className="p-4 text-muted-foreground">{intern.company}</td>
                <td className="p-4 text-muted-foreground">{intern.project}</td>
                <td className="p-4"><Badge variant="outline" className="rounded-full">{intern.type}</Badge></td>
                <td className="p-4 text-muted-foreground">{intern.startDate}</td>
                <td className="p-4 text-muted-foreground">{intern.endDate}</td>
                <td className="p-4">
                  <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Active</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  )
}