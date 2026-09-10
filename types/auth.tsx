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
}