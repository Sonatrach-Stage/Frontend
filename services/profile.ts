import { apiRequest } from './client';

export type MyProfile = {
  id: number
  name: string
  email: string
  phone: string
  company_id?: number
  sector?: string
  studies_level?: string
  establishment?: string
  start_date?: string
  end_date?: string
  job?: string
  department?: string
  specialization?: string
  years_of_experience?: number
}

export async function getMyProfile(): Promise<{ success: boolean; role: string; profile: MyProfile }> {
  return apiRequest('/profile');
}

export async function updateMyProfile(formData: FormData) {
  return apiRequest('/profile/me', {
    method: 'PATCH',
    body: formData,
  });
}

export async function getUserProfile(userId: number): Promise<{ success: boolean; profile: MyProfile }> {
  return apiRequest(`/profile/${userId}`);
}