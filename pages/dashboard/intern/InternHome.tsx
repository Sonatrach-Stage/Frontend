import { CheckCircle2, Clock3 } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { getCurrentUser } from '../../../lib/auth'

const tasks = [
  { title: 'Analyse des besoins', due: '05/09', status: 'Terminée' },
  { title: 'Base de données', due: '10/09', status: 'En cours' },
  { title: 'Documentation', due: '15/09', status: 'À faire' },
]

export default function InternHome() {
  const user = getCurrentUser()

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
          Bonjour {user?.name?.split(' ')[0] ?? ''} 👋
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Bienvenue dans votre espace stagiaire.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-3xl p-5 shadow-retool-sm">
          <p className="text-sm text-muted-foreground">Mon stage</p>
          <p className="mt-2 flex items-center gap-2 text-lg font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> En cours
          </p>
        </Card>
        <Card className="rounded-3xl p-5 shadow-retool-sm">
          <p className="text-sm text-muted-foreground">Progression</p>
          <p className="mt-2 text-lg font-black text-[rgb(var(--intern-navy))] dark:text-foreground">75%</p>
        </Card>
        <Card className="rounded-3xl p-5 shadow-retool-sm">
          <p className="text-sm text-muted-foreground">Tâches terminées</p>
          <p className="mt-2 text-lg font-black text-[rgb(var(--intern-navy))] dark:text-foreground">12 / 16</p>
        </Card>
      </div>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Ma mission</h2>
        <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <p>Entreprise : <span className="font-semibold text-foreground">{user?.companyName ?? '—'}</span></p>
          <p>Encadrant : <span className="font-semibold text-foreground">Ahmed Benali</span></p>
          <p>Début : 01/09/2026</p>
          <p>Fin : 30/09/2026</p>
        </div>
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-[rgb(var(--intern-blue))]" style={{ width: '75%' }} />
        </div>
      </Card>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">📋 Mes tâches</h2>
        <div className="mt-4 space-y-2">
          {tasks.map((task) => (
            <div key={task.title} className="flex items-center justify-between rounded-xl border bg-background/70 p-3 text-sm">
              <span className="font-semibold text-foreground">{task.title}</span>
              <span className="text-muted-foreground">{task.due}</span>
              <Badge variant="outline" className="rounded-full gap-1">
                {task.status === 'Terminée' ? <CheckCircle2 className="h-3 w-3 text-emerald-500" /> : <Clock3 className="h-3 w-3" />}
                {task.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}