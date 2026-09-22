import { AppointmentsBoard } from '../shared/AppointmentsBoard'
import { getSupervisorAppointments } from '../../../api/appointments'

export default function CalendarPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Calendrier</h1>
        <p className="mt-2 text-sm text-muted-foreground">Vos rendez-vous avec vos stagiaires.</p>
      </div>

      <AppointmentsBoard role="supervisor" fetchAppointments={getSupervisorAppointments} requireInternName />
    </>
  )
}