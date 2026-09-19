import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { Download, Eye } from 'lucide-react'
import { theses } from '../../data/dashboardMockData'

export default function ReportsPage() {
  const validated = theses.filter((t) => t.published)

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Rapports</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          
        </p>
      </div>

      <Card className="overflow-x-auto rounded-3xl p-2 shadow-retool-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="p-4">Stagiaire</th>
              <th className="p-4">Type</th>
              <th className="p-4">Titre</th>
              <th className="p-4">Version</th>
              <th className="p-4">Date</th>
              <th className="p-4">Statut</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {validated.map((t) => (
              <tr key={t.id} className="border-b last:border-0">
                <td className="p-4 font-bold text-foreground">{t.intern}</td>
                <td className="p-4"><Badge variant="outline" className="rounded-full">{t.kind}</Badge></td>
                <td className="p-4 text-muted-foreground">{t.title}</td>
                <td className="p-4 text-muted-foreground">{t.version}</td>
                <td className="p-4 text-muted-foreground">{t.date}</td>
                <td className="p-4"><Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{t.status}</Badge></td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-lg"><Eye className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="outline" className="rounded-lg"><Download className="h-3.5 w-3.5" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {validated.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">Aucun rapport validé pour le moment.</p>
        )}
      </Card>
    </>
  )
}