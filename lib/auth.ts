import type { Role } from '../pages/data/internPilotData'

export type RequestStatus = 'pending' | 'accepted' | 'refused'

export type CurrentUser = {
  id: number
  name: string
  email: string
  role: Role
  companyName?: string
  status: RequestStatus
  avatarInitials: string
  internType?: 'PFE' | 'PFC'
}

const STORAGE_KEY = 'stagelink_current_user'

export function saveCurrentUser(user: CurrentUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function getCurrentUser(): CurrentUser | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as CurrentUser
  } catch {
    return null
  }
}

export function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEY)
}