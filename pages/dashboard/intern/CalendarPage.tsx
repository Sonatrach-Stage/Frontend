import { useState } from 'react'
import { CalendarPlus, Clock3, Flag } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { Input } from '../../../lib/shadcn/input'
import { Button } from '../../../lib/shadcn/button'
import { internAppointments, internDeadlines, type Appointment } from '../../data/dashboardMockData'

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(internAppointments)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  function createAppointment() {
    if (!title.trim() || !time) return
    setAppointments((current) => [...current, { id: current.length + 1, time, title, date: date || 'À planifier' }])
    setTitle('')
    setDate('')
    setTime('')
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Calendrier</h1>
        <p className="mt-2 text-sm text-muted-foreground">Rendez-vous, deadlines et soutenance.</p>
      </div>

      <Card className="mb-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="flex items-center gap-2 font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
          <CalendarPlus className="h-4 w-4" /> Nouveau rendez-vous
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Objet du rendez-vous" className="h-10 rounded-xl" />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10 rounded-xl" />
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="h-10 rounded-xl" />
        </div>
        <Button className="mt-4 rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={createAppointment}>
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
                <p className="font-bold text-foreground">{a.time} — {a.title}</p>
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
            {internDeadlines.map((d) => (
              <div key={d.text} className="flex items-center justify-between rounded-xl border bg-background/70 p-3 text-sm">
                <p className="font-bold text-foreground">{d.icon} {d.text}</p>
                <Badge variant="outline" className="rounded-full">{d.date}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}