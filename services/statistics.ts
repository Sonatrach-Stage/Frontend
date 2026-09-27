import { apiRequest } from './client';

export type SuperAdminStatistics = {
  globalCounts: Record<string, string>
  companiesByStatus: { status: string; count: string }[]
  internsByType: { type: string; count: string }[]
  internsByStatus: { status: string; count: string }[]
  tasksByStatus: { status: string; count: string }[]
  tasksByPriority: { priority: string; count: string }[]
  appointmentsByStatus: { status: string; count: string }[]
  documentsByStatus: { status: string; count: string }[]
  documentsByType: { type: string; count: string }[]
  platformGrowth: { month: string; companies: string; interns: string; supervisors: string }[]
  platformActivity: { activity_date: string; tasks: string; documents: string; appointments: string }[]
}

export type CompanyAdminStatistics = {
  companyCounts: Record<string, string>
  internsByStatus: { status: string; count: string }[]
  internsByType: { type: string; count: string }[]
  tasksByStatus: { status: string; count: string }[]
  tasksByPriority: { priority: string; count: string }[]
  documentsByStatus: { status: string; count: string }[]
  appointmentsByStatus: { status: string; count: string }[]
  supervisorWorkload: { supervisor_id: number; supervisor_name: string; intern_count: string }[]
  internshipGrowth: { month: string; interns: string }[]
}

export type SupervisorStatistics = {
  supervisorCounts: Record<string, string>
  internsByStatus: { status: string; count: string }[]
  internsByType: { type: string; count: string }[]
  tasksByStatus: { status: string; count: string }[]
  tasksByPriority: { priority: string; count: string }[]
  documentsByStatus: { status: string; count: string }[]
  appointmentsByStatus: { status: string; count: string }[]
  activities: { month: string; activities: string }[]
}

export type InternStatistics = {
  internCounts: Record<string, string>
  tasksByStatus: { status: string; count: string }[]
  tasksByPriority: { priority: string; count: string }[]
  documentsByStatus: { status: string; count: string }[]
  documentsByType: { type: string; count: string }[]
  appointmentsByStatus: { status: string; count: string }[]
  progress: { start_date: string; end_date: string; status: string; intern_type: string }
}

export async function getSuperAdminStatistics(): Promise<{ success: boolean; statistics: SuperAdminStatistics }> {
  return apiRequest('/statistics/adminsup');
}

export async function getCompanyAdminStatistics(): Promise<{ success: boolean; statistics: CompanyAdminStatistics }> {
  return apiRequest('/statistics/admin-secondary');
}

export async function getSupervisorStatistics(): Promise<{ success: boolean; statistics: SupervisorStatistics }> {
  return apiRequest('/statistics/supervisor');
}

export async function getInternStatistics(): Promise<{ success: boolean; statistics: InternStatistics }> {
  return apiRequest('/statistics/intern');
}