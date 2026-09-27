import { apiRequest } from './client'

export type MyProfile = {
  id: number
  name: string
  email: string
  phone: string
  profil_image?: string
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

export async function getMyProfile(): Promise<{
  success: boolean
  role: string
  profile: MyProfile
}> {
  return apiRequest('/profile')
}

export async function updateMyProfile(formData: FormData) {
  console.log(' Envoi modification profil')

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}:`, {
        name: value.name,
        type: value.type,
        size: value.size,
      })
    } else {
      console.log(`${key}:`, value)
    }
  }

  try {
    const response = await apiRequest('/profile/me', {
      method: 'PATCH',
      body: formData,
    })

    console.log(' Réponse modification profil:', response)

    return response
  } catch (error) {
    console.error(' Erreur API modification profil:', error)
    throw error
  }
}

export async function getUserProfile(
  userId: number
): Promise<{
  success: boolean
  profile: MyProfile
}> {
  return apiRequest(`/profile/${userId}`)
}