import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../lib/auth'

export default function DashboardEntry() {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return <Navigate to="/" replace />
  }

  if (currentUser.status === 'pending') {
    return <Navigate to="/request-pending" replace />
  }

  return <Navigate to={`/dashboard/${currentUser.role}`} replace />
}