import { Badge } from '../../../lib/shadcn/badge'
import { Card } from '../../../lib/shadcn/card'

const tasks = [
  { title: 'Analyse des besoins', due: '05/09', priority: 'Haute', status: 'Terminée' },
  { title: 'Base de données', due: '10/09', priority: 'Haute', status: 'En cours' },
  { title: 'Documentation', due: '15/09', priority: 'Moyenne', status: 'À faire' },
]

export default function MyTasksPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mes tâches</h1>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <Card key={task.title} className="rounded-2xl p-4 shadow-retool-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-foreground">{task.title}</p>
                <p className="text-sm text-muted-foreground">Échéance {task.due} · Priorité {task.priority}</p>
              </div>
              <Badge variant="outline" className="rounded-full">{task.status}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}