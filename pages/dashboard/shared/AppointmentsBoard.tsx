import { useEffect, useMemo, useState } from 'react'
import {
  Plus, Search, List, Calendar as CalendarIcon, Clock, MapPin, Video,
  Check, X, CheckCircle2, User,
} from 'lucide-react'
import { Badge } from '../../../lib/shadcn/badge'
import { Card } from '../../../lib/shadcn/card'
import { Button } from '../../../lib/shadcn/button'
import { Input } from '../../../lib/shadcn/input'
import { Textarea } from '../../../lib/shadcn/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../lib/shadcn/select'
import { cn } from '../../../lib/shadcn/utils'
import {
  createAppointment,
  respondToAppointment,
  cancelAppointment,
  completeAppointment,
  type Appointment,
  type MeetingType,
} from '../../../services/appointments'

const statusBadge: Record<string, { text: string; className: string }> = {
  PENDING: { text: 'En attente', className: 'bg-amber-100 text-amber-700 hover:bg-amber-100' },
  ACCEPTED: { text: 'Accepté', className: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' },
  REJECTED: { text: 'Refusé', className: 'bg-red-100 text-red-700 hover:bg-red-100' },
  CANCELLED: { text: 'Annulé', className: 'bg-muted text-muted-foreground hover:bg-muted' },
  COMPLETED: { text: 'Terminé', className: 'bg-blue-100 text-blue-700 hover:bg-blue-100' },
}

const monthAbbr = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUIN', 'JUIL', 'AOÛT', 'SEP', 'OCT', 'NOV', 'DÉC']

function formatDateBadge(dateStr: string) {
  const d = new Date(dateStr)
  return { month: monthAbbr[d.getMonth()], day: d.getDate() }
}

function formatFullDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

type Filter = 'Tous' | 'À venir' | 'En attente' | 'Terminés' | 'Annulés'

export function AppointmentsBoard({
  role,
  fetchAppointments,
  requireInternName,
}: {
  role: 'intern' | 'supervisor'
  fetchAppointments: () => Promise<{ appointments: Appointment[] }>
  requireInternName: boolean
}) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<number | 'new' | null>(null)

  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('Tous')
  const [view, setView] = useState<'Liste' | 'Calendrier'>('Liste')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [meetingType, setMeetingType] = useState<MeetingType>('VISIO')
  const [location, setLocation] = useState('')
  const [meetingLink, setMeetingLink] = useState('')
  const [internName, setInternName] = useState('')

  function loadAppointments() {
    setLoading(true)
    fetchAppointments()
      .then((res) => setAppointments(res.appointments))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadAppointments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const today = new Date().toISOString().slice(0, 10)

  const stats = useMemo(() => {
    const upcoming = appointments.filter((a) => a.appointment_date >= today && (a.status === 'ACCEPTED' || a.status === 'PENDING')).length
    const pending = appointments.filter((a) => a.status === 'PENDING').length
    const completed = appointments.filter((a) => a.status === 'COMPLETED').length
    return { upcoming, pending, completed }
  }, [appointments, today])

  const filtered = useMemo(() => {
    let list = appointments
    if (filter === 'À venir') list = list.filter((a) => a.appointment_date >= today && (a.status === 'ACCEPTED' || a.status === 'PENDING'))
    if (filter === 'En attente') list = list.filter((a) => a.status === 'PENDING')
    if (filter === 'Terminés') list = list.filter((a) => a.status === 'COMPLETED')
    if (filter === 'Annulés') list = list.filter((a) => a.status === 'CANCELLED' || a.status === 'REJECTED')
    if (search.trim()) list = list.filter((a) => a.title.toLowerCase().includes(search.trim().toLowerCase()))
    return [...list].sort((a, b) => (a.appointment_date + a.start_time).localeCompare(b.appointment_date + b.start_time))
  }, [appointments, filter, search, today])

  async function handleCreate() {
    if (!title.trim() || !date || !startTime || !endTime) return
    if (requireInternName && !internName.trim()) return
    if (meetingType === 'PRESENTIEL' && !location.trim()) return
    if (meetingType === 'VISIO' && !meetingLink.trim()) return

    setBusyId('new')
    setError('')
    try {
      await createAppointment({
        title,
        description,
        appointment_date: date,
        start_time: startTime,
        end_time: endTime,
        meeting_type: meetingType,
        ...(meetingType === 'PRESENTIEL' ? { location } : {}),
        ...(meetingType === 'VISIO' ? { meeting_link: meetingLink } : {}),
        ...(requireInternName ? { intern_name: internName } : {}),
      })
      setTitle(''); setDescription(''); setDate(''); setStartTime(''); setEndTime('')
      setLocation(''); setMeetingLink(''); setInternName('')
      setShowForm(false)
      loadAppointments()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création')
    } finally {
      setBusyId(null)
    }
  }

  async function handleRespond(id: number, action: 'ACCEPT' | 'REJECT') {
    setBusyId(id)
    try {
      await respondToAppointment(id, action)
      loadAppointments()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setBusyId(null)
    }
  }

  async function handleCancel(id: number) {
    if (!confirm('Annuler ce rendez-vous ?')) return
    setBusyId(id)
    try {
      await cancelAppointment(id)
      loadAppointments()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setBusyId(null)
    }
  }

  async function handleComplete(id: number) {
    setBusyId(id)
    try {
      await completeAppointment(id)
      loadAppointments()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Rendez-vous</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {role === 'intern' ? 'Gérez vos réunions avec votre encadrant.' : 'Gérez vos réunions avec vos stagiaires.'}
          </p>
        </div>
        <Button className="rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={() => setShowForm((v) => !v)}>
          <Plus className="h-4 w-4" /> Nouveau rendez-vous
        </Button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl p-5 shadow-retool-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">À venir</p>
          <p className="mt-2 text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{stats.upcoming}</p>
        </Card>
        <Card className="rounded-2xl p-5 shadow-retool-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">En attente</p>
          <p className="mt-2 text-3xl font-black text-amber-600">{stats.pending}</p>
        </Card>
        <Card className="rounded-2xl p-5 shadow-retool-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Terminés</p>
          <p className="mt-2 text-3xl font-black text-emerald-600">{stats.completed}</p>
        </Card>
      </div>

      {showForm && (
        <Card className="mb-6 rounded-3xl p-6 shadow-retool-sm">
          <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Nouveau rendez-vous</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {requireInternName && (
              <Input value={internName} onChange={(e) => setInternName(e.target.value)} placeholder="Nom du stagiaire" className="h-10 rounded-xl sm:col-span-2" />
            )}
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" className="h-10 rounded-xl sm:col-span-2" />
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="rounded-xl sm:col-span-2" />
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10 rounded-xl" />
            <Select value={meetingType} onValueChange={(v) => setMeetingType(v as MeetingType)}>
              <SelectTrigger className="h-10 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="VISIO">Visioconférence</SelectItem>
                <SelectItem value="PRESENTIEL">Présentiel</SelectItem>
              </SelectContent>
            </Select>
            <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="h-10 rounded-xl" />
            <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="h-10 rounded-xl" />
            {meetingType === 'VISIO' ? (
              <Input value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} placeholder="Lien de la visio" className="h-10 rounded-xl sm:col-span-2" />
            ) : (
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Lieu du rendez-vous" className="h-10 rounded-xl sm:col-span-2" />
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <Button disabled={busyId === 'new'} className="rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={handleCreate}>
              {busyId === 'new' ? 'Création...' : 'Créer le rendez-vous'}
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={() => setShowForm(false)}>Annuler</Button>
          </div>
        </Card>
      )}

      {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex rounded-xl border p-1">
          <button
            type="button"
            onClick={() => setView('Liste')}
            className={cn('flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold', view === 'Liste' ? 'bg-[rgb(var(--intern-navy))] text-white' : 'text-muted-foreground')}
          >
            <List className="h-3.5 w-3.5" /> Liste
          </button>
          <button
            type="button"
            onClick={() => setView('Calendrier')}
            className={cn('flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold', view === 'Calendrier' ? 'bg-[rgb(var(--intern-navy))] text-white' : 'text-muted-foreground')}
          >
            <CalendarIcon className="h-3.5 w-3.5" /> Calendrier
          </button>
        </div>

        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un rendez-vous..." className="h-10 rounded-xl pl-10" />
        </div>

        <div className="flex flex-wrap gap-2">
          {(['Tous', 'À venir', 'En attente', 'Terminés', 'Annulés'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors',
                filter === f ? 'border-[rgb(var(--intern-navy))] bg-[rgb(var(--intern-navy))] text-white' : 'hover:bg-muted',
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}

      {!loading && view === 'Liste' && (
        <div className="space-y-4">
          {filtered.map((appt) => {
            const badge = statusBadge[appt.status]
            const { month, day } = formatDateBadge(appt.appointment_date)
            const contactLabel = role === 'intern' ? 'Mon encadrant' : 'Stagiaire affecté'
            return (
              <Card key={appt.id} className="rounded-2xl p-5 shadow-retool-sm">
                <div className="flex flex-wrap items-start gap-4">
                  <div className="flex w-14 shrink-0 flex-col items-center rounded-xl bg-background/70 py-2 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{month}</span>
                    <span className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{day}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{appt.title}</p>
                      <Badge className={cn('rounded-full', badge.className)}>{badge.text}</Badge>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[rgb(var(--intern-soft-blue))] text-[9px] font-black text-[rgb(var(--intern-navy))]">
                        <User className="h-3 w-3" />
                      </div>
                      {contactLabel}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><CalendarIcon className="h-3.5 w-3.5" /> {formatFullDate(appt.appointment_date)}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {appt.start_time} – {appt.end_time}</span>
                      <span className="flex items-center gap-1.5">
                        {appt.meeting_type === 'VISIO' ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                        {appt.meeting_type === 'VISIO' ? 'Visioconférence' : (appt.location || 'Présentiel')}
                      </span>
                    </div>

                    {appt.description && <p className="mt-3 text-sm text-muted-foreground">{appt.description}</p>}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="rounded-lg" onClick={() => setExpandedId(expandedId === appt.id ? null : appt.id)}>
                        Voir détails
                      </Button>

                      {appt.status === 'PENDING' && (
                        <>
                          <Button size="sm" disabled={busyId === appt.id} className="rounded-lg bg-[rgb(var(--intern-navy))] text-white" onClick={() => handleRespond(appt.id, 'ACCEPT')}>
                            <Check className="h-3.5 w-3.5" /> Accepter
                          </Button>
                          <Button size="sm" variant="outline" disabled={busyId === appt.id} className="rounded-lg text-red-600" onClick={() => handleRespond(appt.id, 'REJECT')}>
                            <X className="h-3.5 w-3.5" /> Refuser
                          </Button>
                        </>
                      )}

                      {appt.status === 'ACCEPTED' && (
                        <>
                          <Button size="sm" disabled={busyId === appt.id} className="rounded-lg bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => handleComplete(appt.id)}>
                            <CheckCircle2 className="h-3.5 w-3.5" /> Marquer terminé
                          </Button>
                          <Button size="sm" variant="outline" disabled={busyId === appt.id} className="rounded-lg text-red-600" onClick={() => handleCancel(appt.id)}>
                            Annuler
                          </Button>
                        </>
                      )}
                    </div>

                    {expandedId === appt.id && (
                      <div className="mt-4 rounded-xl border bg-background/70 p-3 text-xs text-muted-foreground">
                        {appt.meeting_type === 'VISIO' && appt.meeting_link && (
                          <p>Lien : <a href={appt.meeting_link} target="_blank" rel="noreferrer" className="underline">{appt.meeting_link}</a></p>
                        )}
                        {appt.cancellation_reason && <p className="mt-1">Motif d'annulation : {appt.cancellation_reason}</p>}
                        <p className="mt-1">Créé par : {appt.created_by === 'INTERN' ? 'le stagiaire' : "l'encadrant"}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
          {filtered.length === 0 && (
            <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
              Aucun rendez-vous dans cette catégorie.
            </Card>
          )}
        </div>
      )}

      {!loading && view === 'Calendrier' && (
        <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
          Vue calendrier à venir — utilisez la vue Liste pour le moment.
        </Card>
      )}
    </>
  )
}