import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Textarea } from '../../../lib/shadcn/textarea'
import { Button } from '../../../lib/shadcn/button'
import { Badge } from '../../../lib/shadcn/badge'
import { cn } from '../../../lib/shadcn/utils'
import { supervisorInterns } from '../../data/dashboardMockData'

type Activity = {
  id: number
  title: string
  description: string
  interns: string[]
  date: string
  time: string
  status: 'À faire' | 'En cours' | 'Terminée'
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, title: 'Analyse des besoins', description: 'Recueillir les besoins fonctionnels.', interns: ['Sara'], date: '2026-09-05', time: '10:00', status: 'Terminée' },
  ])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedInterns, setSelectedInterns] = useState<string[]>([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  function toggleIntern(name: string) {
    setSelectedInterns((current) =>
      current.includes(name) ? current.filter((n) => n !== name) : [...current, name],
    )
  }

  function createActivity() {
    if (!title.trim() || selectedInterns.length === 0 || !date) return
    setActivities((current) => [
      ...current,
      { id: current.length + 1, title, description, interns: selectedInterns, date, time, status: 'À faire' },
    ])
    setTitle('')
    setDescription('')
    setSelectedInterns([])
    setDate('')
    setTime('')
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Activités</h1>
        <p className="mt-2 text-sm text-muted-foreground">Créez une activité et assignez-la à un ou plusieurs stagiaires.</p>
      </div>

      <Card className="mb-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Nouvelle activité</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-foreground">Titre</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Développement backend" className="h-10 rounded-xl" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-foreground">Description</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-xl" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Date</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10 rounded-xl" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Heure</label>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="h-10 rounded-xl" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-foreground">Stagiaire(s)</label>
            <div className="flex flex-wrap gap-2">
              {supervisorInterns.map((intern) => (
                <button
                  key={intern.name}
                  type="button"
                  onClick={() => toggleIntern(intern.name)}
                  className={cn(
                    'rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors',
                    selectedInterns.includes(intern.name) ? 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))]' : 'hover:bg-muted',
                  )}
                >
                  {intern.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Button className="mt-5 rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={createActivity}>
          <Plus className="h-4 w-4" />
          Créer l'activité
        </Button>
      </Card>

      <div className="space-y-3">
        {activities.map((activity) => (
          <Card key={activity.id} className="rounded-2xl p-4 shadow-retool-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-foreground">{activity.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {activity.interns.join(', ')} · {activity.date}{activity.time ? ` à ${activity.time}` : ''}
                </p>
              </div>
              <Badge variant="outline" className="rounded-full">{activity.status}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}