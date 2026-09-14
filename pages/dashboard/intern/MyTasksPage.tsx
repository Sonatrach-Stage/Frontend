import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Badge } from '../../../lib/shadcn/badge'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Button } from '../../../lib/shadcn/button'
import { cn } from '../../../lib/shadcn/utils'

type Task = {
  id: number
  title: string
  due: string
  priority: 'Basse' | 'Moyenne' | 'Haute'
  status: 'À faire' | 'En cours' | 'Terminée' | 'En retard'
  source: 'supervisor' | 'intern'
}

const initialTasks: Task[] = [
  { id: 1, title: 'Analyse des besoins', due: '05/09', priority: 'Haute', status: 'Terminée', source: 'supervisor' },
  { id: 2, title: 'Base de données', due: '10/09', priority: 'Haute', status: 'En cours', source: 'supervisor' },
  { id: 3, title: 'Documentation', due: '15/09', priority: 'Moyenne', status: 'À faire', source: 'supervisor' },
]

const statusColors: Record<Task['status'], string> = {
  'À faire': 'text-muted-foreground',
  'En cours': 'text-blue-600',
  Terminée: 'text-emerald-600',
  'En retard': 'text-red-600',
}

export default function MyTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<'Toutes' | Task['status']>('Toutes')
  const [title, setTitle] = useState('')
  const [due, setDue] = useState('')

  const filtered = tasks.filter((t) => filter === 'Toutes' || t.status === filter)

  function addTask() {
    if (!title.trim()) return
    setTasks((current) => [
      ...current,
      { id: current.length + 1, title, due: due || '—', priority: 'Moyenne', status: 'À faire', source: 'intern' },
    ])
    setTitle('')
    setDue('')
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mes tâches</h1>
        <p className="mt-2 text-sm text-muted-foreground">Tâches assignées par votre encadrant, et vos propres tâches personnelles.</p>
      </div>

      <Card className="mb-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">+ Créer une tâche personnelle</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto_auto]">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre de la tâche" className="h-10 rounded-xl" />
          <Input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="h-10 rounded-xl" />
          <Button className="rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={addTask}>
            <Plus className="h-4 w-4" /> Ajouter
          </Button>
        </div>
      </Card>

      <div className="mb-5 flex flex-wrap gap-2">
        {(['Toutes', 'À faire', 'En cours', 'Terminée', 'En retard'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors',
              filter === f ? 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))]' : 'hover:bg-muted',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((task) => (
          <Card key={task.id} className="rounded-2xl p-4 shadow-retool-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-foreground">{task.title}</p>
                <p className="text-sm text-muted-foreground">
                  Échéance {task.due} · Priorité {task.priority} ·{' '}
                  <span className="italic">{task.source === 'supervisor' ? 'Assignée par l\'encadrant' : 'Créée par moi'}</span>
                </p>
              </div>
              <Badge variant="outline" className={cn('rounded-full', statusColors[task.status])}>{task.status}</Badge>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">Aucune tâche.</Card>
        )}
      </div>
    </>
  )
}