import { AppointmentsBoard } from '../shared/AppointmentsBoard'
import { getInternAppointments } from '../../../services/appointments'

export default function CalendarPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Calendrier</h1>
        <p className="mt-2 text-sm text-muted-foreground">Vos rendez-vous avec votre encadrant.</p>
      </div>

      <AppointmentsBoard role="intern" fetchAppointments={getInternAppointments} requireInternName={false} />
    </>
  )
}