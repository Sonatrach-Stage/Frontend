import { Badge } from '../../../lib/shadcn/badge'
import { Card } from '../../../lib/shadcn/card'
import { supervisorInterns } from '../../data/dashboardMockData'

export default function InternsPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mes stagiaires</h1>
        <p className="mt-2 text-sm text-muted-foreground">Tous les stagiaires acceptés dans votre entreprise.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {supervisorInterns.map((intern) => (
          <Card key={intern.name} className="rounded-2xl p-5 shadow-retool-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgb(var(--intern-soft-blue))] font-black text-[rgb(var(--intern-navy))]">
                {intern.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-foreground">{intern.name}</p>
                <Badge variant="outline" className="mt-1 rounded-full text-xs">Stage en cours</Badge>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progression</span>
                <span>{intern.progress}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-[rgb(var(--intern-blue))]" style={{ width: `${intern.progress}%` }} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}