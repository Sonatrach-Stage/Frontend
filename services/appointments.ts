import { apiRequest } from './client';

export type MeetingType = 'VISIO' | 'PRESENTIEL'
export type AppointmentStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED'

export type Appointment = {
  id: number
  intern_id: number
  supervisor_id: number
  title: string
  description?: string
  appointment_date: string
  start_time: string
  end_time: string
  meeting_type: MeetingType
  location?: string | null
  meeting_link?: string | null
  status: AppointmentStatus
  created_by: 'INTERN' | 'SUPERVISOR'
  created_at?: string
  updated_at?: string
  cancellation_reason?: string
}

type CreateAppointmentInput = {
  title: string
  description?: string
  appointment_date: string
  start_time: string
  end_time: string
  meeting_type: MeetingType
  location?: string
  meeting_link?: string
  intern_name?: string
}

export async function createAppointment(input: CreateAppointmentInput): Promise<{ success: boolean; message: string; appointment: Appointment }> {
  return apiRequest('/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

export async function getInternAppointments(): Promise<{ success: boolean; appointments: Appointment[] }> {
  return apiRequest('/appointments/intern');
}

export async function getSupervisorAppointments(): Promise<{ success: boolean; appointments: Appointment[] }> {
  return apiRequest('/appointments/supervisor');
}

export async function getAppointmentDetails(id: number): Promise<{ success: boolean; appointment: Appointment }> {
  return apiRequest(`/appointments/${id}`);
}

export async function respondToAppointment(id: number, action: 'ACCEPT' | 'REJECT', reason?: string) {
  return apiRequest(`/appointments/${id}/respond`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...(reason ? { reason } : {}) }),
  });
}

export async function cancelAppointment(id: number, reason?: string) {
  return apiRequest(`/appointments/${id}/cancel`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reason ? { reason } : {}),
  });
}

export async function completeAppointment(id: number) {
  return apiRequest(`/appointments/${id}/complete`, {
    method: 'PATCH',
  });
}