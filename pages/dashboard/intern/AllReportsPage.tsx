import { Download, Eye } from 'lucide-react'
import { Badge } from '../../../lib/shadcn/badge'
import { Card } from '../../../lib/shadcn/card'
import { Button } from '../../../lib/shadcn/button'
import { theses } from '../../data/dashboardMockData'

export default function AllReportsPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Tous les rapports et mémoires</h1>
        <p className="mt-2 text-sm text-muted-foreground">Documents publiés par les encadrants, visibles par tous.</p>
      </div>

      <div className="space-y-3">
        {theses.filter((t) => t.published).map((t) => (
          <Card key={t.id} className="rounded-2xl p-4 shadow-retool-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-foreground">{t.title}</p>
                <p className="text-sm text-muted-foreground">{t.intern} · {t.company} · {t.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{t.status}</Badge>
                <Button size="sm" variant="outline" className="rounded-lg"><Eye className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="outline" className="rounded-lg"><Download className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}