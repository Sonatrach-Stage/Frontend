import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'

const stats = [
  { label: 'Tâches', value: '16' },
  { label: 'Terminées', value: '12' },
  { label: 'En cours', value: '2' },
  { label: 'À faire', value: '2' },
]

const reports = [
  { week: 'Semaine 1', status: 'Validé' },
  { week: 'Semaine 2', status: 'Validé' },
  { week: 'Semaine 3', status: 'En attente' },
  { week: 'Semaine 4', status: 'À envoyer' },
]

export default function DashboardTab() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Tableau de bord</h1>
        <p className="mt-2 text-sm text-muted-foreground">Suivi statistique de votre stage.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="rounded-3xl p-5 shadow-retool-sm">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-3 text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">📝 Rapports</h2>
          <Button size="sm" className="rounded-lg bg-[rgb(var(--intern-navy))] text-white">+ Ajouter un rapport</Button>
        </div>
        <div className="mt-4 space-y-2">
          {reports.map((r) => (
            <div key={r.week} className="flex items-center justify-between rounded-xl border bg-background/70 p-3 text-sm">
              <span className="font-semibold text-foreground">{r.week}</span>
              <Badge variant="outline" className="rounded-full">{r.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}