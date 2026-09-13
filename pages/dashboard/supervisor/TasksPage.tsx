import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Textarea } from '../../../lib/shadcn/textarea'
import { Button } from '../../../lib/shadcn/button'
import { Badge } from '../../../lib/shadcn/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../lib/shadcn/select'
import { cn } from '../../../lib/shadcn/utils'
import { supervisorInterns } from '../../data/dashboardMockData'

type Task = {
  id: number
  title: string
  description: string
  intern: string
  dueDate: string
  dueTime: string
  priority: 'Basse' | 'Moyenne' | 'Haute'
  status: 'À faire' | 'En développement' | 'Terminée' | 'Abandonnée'
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'API backend', description: '', intern: 'Ahmed', dueDate: '2026-09-20', dueTime: '18:00', priority: 'Haute', status: 'En développement' },
  ])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [intern, setIntern] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [dueTime, setDueTime] = useState('')
  const [priority, setPriority] = useState<Task['priority']>('Moyenne')

  function createTask() {
    if (!title.trim() || !intern || !dueDate) return
    setTasks((current) => [
      ...current,
      { id: current.length + 1, title, description, intern, dueDate, dueTime, priority, status: 'À faire' },
    ])
    setTitle('')
    setDescription('')
    setIntern('')
    setDueDate('')
    setDueTime('')
    setPriority('Moyenne')
  }

  const priorityColor: Record<Task['priority'], string> = {
    Basse: 'text-muted-foreground',
    Moyenne: 'text-amber-600',
    Haute: 'text-red-600',
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Tâches</h1>
        <p className="mt-2 text-sm text-muted-foreground">Créez une tâche pour un stagiaire avec échéance précise.</p>
      </div>

      <Card className="mb-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Nouvelle tâche</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-foreground">Titre</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tests unitaires" className="h-10 rounded-xl" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-foreground">Description</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-xl" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Stagiaire</label>
            <Select value={intern} onValueChange={setIntern}>
              <SelectTrigger className="h-10 rounded-xl">
                <SelectValue placeholder="Choisir un stagiaire" />
              </SelectTrigger>
              <SelectContent>
                {supervisorInterns.map((i) => (
                  <SelectItem key={i.name} value={i.name}>{i.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Priorité</label>
            <Select value={priority} onValueChange={(v) => setPriority(v as Task['priority'])}>
              <SelectTrigger className="h-10 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basse">Basse</SelectItem>
                <SelectItem value="Moyenne">Moyenne</SelectItem>
                <SelectItem value="Haute">Haute</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Date limite</label>
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="h-10 rounded-xl" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Heure limite</label>
            <Input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} className="h-10 rounded-xl" />
          </div>
        </div>
        <Button className="mt-5 rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={createTask}>
          <Plus className="h-4 w-4" />
          Créer la tâche
        </Button>
      </Card>

      <div className="space-y-3">
        {tasks.map((task) => (
          <Card key={task.id} className="rounded-2xl p-4 shadow-retool-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-foreground">{task.title}</p>
                <p className={cn('mt-1 text-sm', priorityColor[task.priority])}>
                  {task.intern} · Échéance {task.dueDate}{task.dueTime ? ` à ${task.dueTime}` : ''} · Priorité {task.priority}
                </p>
              </div>
              <Badge variant="outline" className="rounded-full">{task.status}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}