import { apiRequest } from './client';

export type ApiTask = {
  id: number
  company_id: number
  supervisor_id: number
  intern_id: number
  title: string
  description: string
  priority: string
  end_date: string
  status: string
}

export type ApiActivity = {
  id: number
  company_id: number
  supervisor_id: number
  interns: string
  title: string
  description: string
  end_date: string
}

// --- Lecture (encadrant) ---
export async function getSupervisorTasks(): Promise<{ success: boolean; count: number; taches: ApiTask[] }> {
  return apiRequest('/actandtach/sup/taches');
}

export async function getSupervisorActivities(): Promise<{ success: boolean; count: number; activities: ApiActivity[] }> {
  return apiRequest('/actandtach/sup/activities');
}

// --- Création (encadrant) ---
type NewSupervisorTaskInput = {
  intern_name: string
  title: string
  description: string
  priority: string
  end_date: string
}

export async function createSupervisorTask(input: NewSupervisorTaskInput) {
  return apiRequest('/actandtach/sup/new_tache', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

type NewActivityInput = {
  title: string
  description: string
  interns: string
  end_date: string
}

export async function createSupervisorActivity(input: NewActivityInput) {
  return apiRequest('/actandtach/sup/new_activity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

// --- Modification (encadrant) ---
type UpdateSupervisorTaskInput = Partial<{
  intern_name: string
  title: string
  description: string
  priority: string
  end_date: string
}>

export async function updateSupervisorTask(tacheId: number, input: UpdateSupervisorTaskInput) {
  return apiRequest(`/actandtach/sup/modify_tache/${tacheId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

type UpdateActivityInput = Partial<{
  title: string
  description: string
  interns: string
  end_date: string
}>

export async function updateSupervisorActivity(activityId: number, input: UpdateActivityInput) {
  return apiRequest(`/actandtach/sup/modify_activity/${activityId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

// --- Suppression (encadrant) ---
export async function deleteSupervisorTask(tacheId: number) {
  return apiRequest(`/actandtach/sup/delete_tache/${tacheId}`, {
    method: 'DELETE',
  });
}

export async function deleteSupervisorActivity(activityId: number) {
  return apiRequest(`/actandtach/sup/delete_activity/${activityId}`, {
    method: 'DELETE',
  });
}

// --- Lecture (stagiaire) ---
export async function getInternTasks(): Promise<{ success: boolean; count: number; taches: ApiTask[] }> {
  return apiRequest('/actandtach/int/taches');
}

export async function getInternActivities(): Promise<{ success: boolean; count: number; activities: ApiActivity[] }> {
  return apiRequest('/actandtach/int/activities');
}

// --- Création / modification / suppression (stagiaire, pour lui-même) ---
// ⚠️ Chemin avec "interns" (pluriel), différent des GET qui utilisent "int"
type NewInternTaskInput = {
  title: string
  description: string
  priority: string
  end_date: string
}

export async function createInternTask(input: NewInternTaskInput) {
  return apiRequest('/actandtach/interns/new_tache', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

type UpdateInternTaskInput = Partial<{
  title: string
  description: string
  priority: string
  end_date: string
}>

export async function updateInternTask(tacheId: number, input: UpdateInternTaskInput) {
  return apiRequest(`/actandtach/interns/modify_tache/${tacheId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

export async function deleteInternTask(tacheId: number) {
  return apiRequest(`/actandtach/interns/delete_tache/${tacheId}`, {
    method: 'DELETE',
  });
}