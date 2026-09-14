import { useState } from 'react'
import { Plus, Upload } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { Input } from '../../../lib/shadcn/input'
import { Textarea } from '../../../lib/shadcn/textarea'
import { Button } from '../../../lib/shadcn/button'
import { cn } from '../../../lib/shadcn/utils'
import { internActivities as initial, type InternActivity } from '../../data/dashboardMockData'

const statusColors: Record<InternActivity['status'], string> = {
  'En attente': 'text-amber-600',
  'En cours de validation': 'text-blue-600',
  Validée: 'text-emerald-600',
  Refusée: 'text-red-600',
}

export default function MyActivitiesPage() {
  const [activities, setActivities] = useState<InternActivity[]>(initial)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [duration, setDuration] = useState('')
  const [category, setCategory] = useState('')

  function addActivity() {
    if (!title.trim() || !date) return
    setActivities((current) => [
      { id: current.length + 1, title, description, date, duration, category, status: 'En attente' },
      ...current,
    ])
    setTitle('')
    setDescription('')
    setDate('')
    setDuration('')
    setCategory('')
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mes activités</h1>
        <p className="mt-2 text-sm text-muted-foreground">Déclarez ce que vous avez réalisé. Votre encadrant validera ensuite.</p>
      </div>

      <Card className="mb-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">+ Ajouter une activité</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" className="h-10 rounded-xl sm:col-span-2" />
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="rounded-xl sm:col-span-2" />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10 rounded-xl" />
          <Input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Durée (ex. 4h)" className="h-10 rounded-xl" />
          <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Catégorie" className="h-10 rounded-xl sm:col-span-2" />
          <Button type="button" variant="outline" className="rounded-xl sm:col-span-2">
            <Upload className="h-4 w-4" /> Joindre un fichier / preuve
          </Button>
        </div>
        <Button className="mt-4 rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={addActivity}>
          <Plus className="h-4 w-4" /> Ajouter l'activité
        </Button>
      </Card>

      <div className="space-y-3">
        {activities.map((a) => (
          <Card key={a.id} className="rounded-2xl p-4 shadow-retool-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-foreground">{a.title}</p>
                <p className="text-sm text-muted-foreground">{a.category} · {a.date} · {a.duration}</p>
              </div>
              <Badge variant="outline" className={cn('rounded-full', statusColors[a.status])}>{a.status}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}