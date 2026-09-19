import { apiRequest } from './client';

export type ApiCompany = {
  id: number
  user_id: number
  name: string
  address: string
  logo: string
  description: string
  website_URL: string
  registration_number: string
  company_email: string
  company_phone: string
  company_status: string
}

export async function getAllCompanies(): Promise<{ success: boolean; companies: ApiCompany[] }> {
  return apiRequest('/adminsup/companies');
}

export async function getPendingCompanies(): Promise<{ success: boolean; companies: ApiCompany[] }> {
  return apiRequest('/adminsup/companies/pending');
}

export async function getApprovedCompanies(): Promise<{ success: boolean; companies: ApiCompany[] }> {
  return apiRequest('/adminsup/companies/approved');
}

export async function approveCompany(id: number) {
  return apiRequest(`/adminsup/companies/${id}/approve`, {
    method: 'PATCH',
  });
}

export async function rejectCompany(id: number) {
  return apiRequest(`/adminsup/companies/${id}/reject`, {
    method: 'PATCH',
  });
}

export async function deleteCompany(id: number) {
  return apiRequest(`/adminsup/companies/${id}`, {
    method: 'DELETE',
  });
}