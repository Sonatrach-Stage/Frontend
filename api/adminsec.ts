import { apiRequest } from './client';

export type PendingIntern = {
  id: number
  user_id: number
  company_id: number
  intern_type: string
  sector: string
  studies_level: string
  establishment: string
  start_date: string
  end_date: string
  status: string
  con_status: string
  convention_url: string
}

export type CompanyIntern = {
  id: number
  user_id: number
  company_id: number
  status: string
  con_status: string
}

export type CompanySupervisor = {
  id: number
  user_id: number
  company_id: number
  job: string
  department: string
  specialization: string
  years_of_experience: number
}

export async function getPendingInterns(): Promise<{ success: boolean; count: number; interns: PendingIntern[] }> {
  return apiRequest('/adminsec/interns/pending');
}

export async function getAllInterns(): Promise<{ success: boolean; count: number; interns: CompanyIntern[] }> {
  return apiRequest('/adminsec/interns');
}

export async function getSupervisors(): Promise<{ success: boolean; count: number; supervisors: CompanySupervisor[] }> {
  return apiRequest('/adminsec/supervisors');
}

export async function approveIntern(internId: number) {
  return apiRequest(`/adminsec/interns/${internId}/approve`, {
    method: 'PATCH',
  });
}

export async function rejectIntern(internId: number) {
  return apiRequest(`/adminsec/interns/${internId}/reject`, {
    method: 'PATCH',
  });
}

export async function activateIntern(internId: number) {
  return apiRequest(`/adminsec/interns/${internId}/activate`, {
    method: 'PATCH',
  });
}

export async function deactivateIntern(internId: number) {
  return apiRequest(`/adminsec/interns/${internId}/desactivate`, {
    method: 'PATCH',
  });
}

export async function assignSupervisorToIntern(internId: number, supervisorName: string) {
  return apiRequest(`/adminsec/interns/${internId}/supervisor`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ supervisorName }),
  });
}

export async function activateSupervisor(superId: number) {
  return apiRequest(`/adminsec/supervisors/${superId}/activate`, {
    method: 'PATCH',
  });
}

export async function deactivateSupervisor(superId: number) {
  return apiRequest(`/adminsec/supervisors/${superId}/desactivate`, {
    method: 'PATCH',
  });
}