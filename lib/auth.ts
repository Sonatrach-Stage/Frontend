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
const ACCESS_TOKEN_KEY = 'stagelink_access_token'
const REFRESH_TOKEN_KEY = 'stagelink_refresh_token'

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
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

// Convertit le rôle renvoyé par le backend vers le type Role du frontend
export function mapBackendRole(backendRole: string): Role {
  const normalized = backendRole.toUpperCase().trim()

  switch (normalized) {
    case 'INTERN':
      return 'intern'
    case 'SUPERVISOR':
      return 'supervisor'
    case 'SECONDARY_ADMIN':
      return 'company-admin'
    case 'SUPER_ADMIN':
    case 'SUPERADMIN':
    case 'ADMIN':
      return 'super-admin'
    default:
      console.warn('Rôle backend non reconnu:', backendRole, '→ retombé sur "intern" par défaut')
      return 'intern'
  }
}