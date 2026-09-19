import { apiRequest } from './client';

export async function deleteCompany(id: number) {
  return apiRequest(`/companies/${id}`, {
    method: 'DELETE',
  });
}