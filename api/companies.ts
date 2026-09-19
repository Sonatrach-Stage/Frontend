import { apiRequest } from './client';

export type PublicCompany = {
  id: number
  name: string
  logo: string
  company_status: string
}

export async function getApprovedCompaniesPublic(): Promise<{ success: boolean; companies: PublicCompany[] }> {
  return apiRequest('/companies/approved');
}