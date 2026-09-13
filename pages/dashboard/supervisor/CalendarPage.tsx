import { useState } from 'react'
import { Clock3, Flag, Plus } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { Input } from '../../../lib/shadcn/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../lib/shadcn/select'
import {
  supervisorAppointments,
  supervisorDeadlines,
  supervisorEventTypes,
  supervisorInterns,
  type Appointment,
} from '../../data/dashboardMockData'

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(supervisorAppointments)
  const [title, setTitle] = useState('')
  const [intern, setIntern] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  function createAppointment() {
    if (!title.trim() || !intern || !time) return
    setAppointments((current) => [
      ...current,
      { id: current.length + 1, time, title, date: date || 'À planifier', intern },
    ])
    setTitle('')
    setIntern('')
    setDate('')
    setTime('')
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Calendrier</h1>
        <p className="mt-2 text-sm text-muted-foreground">Réunions, échéances et rendez-vous avec vos stagiaires.</p>
      </div>

      <Card className="mb-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Créer un rendez-vous</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre du rendez-vous" className="h-10 rounded-xl" />
          <Select value={intern} onValueChange={setIntern}>
            <SelectTrigger className="h-10 rounded-xl"><SelectValue placeholder="Stagiaire" /></SelectTrigger>
            <SelectContent>
              {supervisorInterns.map((i) => <SelectItem key={i.name} value={i.name}>{i.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10 rounded-xl" />
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="h-10 rounded-xl" />
        </div>
        <Button className="mt-4 rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={createAppointment}>
          <Plus className="h-4 w-4" />
          Créer le rendez-vous
        </Button>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="flex items-center gap-2 font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
            <Clock3 className="h-4 w-4" /> Rendez-vous
          </h2>
          <div className="mt-4 space-y-2">
            {appointments.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-xl border bg-background/70 p-3 text-sm">
                <div>
                  <p className="font-bold text-foreground">{a.time} — {a.title}</p>
                  {a.intern && <p className="text-xs text-muted-foreground">{a.intern}</p>}
                </div>
                <Badge variant="outline" className="rounded-full">{a.date}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="flex items-center gap-2 font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
            <Flag className="h-4 w-4" /> Échéances
          </h2>
          <div className="mt-4 space-y-2">
            {supervisorDeadlines.map((d) => (
              <div key={d.id} className="flex items-center justify-between rounded-xl border bg-background/70 p-3 text-sm">
                <p className="font-bold text-foreground">{d.title}</p>
                <Badge variant="outline" className="rounded-full">{d.date}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Types d'événements</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {supervisorEventTypes.map((type) => (
            <Badge key={type} variant="outline" className="rounded-full px-4 py-1.5">{type}</Badge>
          ))}
        </div>
      </Card>
    </>
  )
}