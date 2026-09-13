/*import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../../lib/auth'

import SuperAdminHome from './SuperAdminHome'
import CompanyAdminHome from './company-admin/CompanyAdminHome'
import SupervisorHome from './SupervisorHome'
import InternHome from './intern/InternHome'

export default function DashboardRouter() {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return <Navigate to="/" replace />
  }

  if (currentUser.status === 'pending') {
    return <Navigate to="/request-pending" replace />
  }

  switch (currentUser.role) {
    case 'super-admin':
      return <SuperAdminHome user={currentUser} />

    case 'company-admin':
      return <CompanyAdminHome user={currentUser} />

    case 'supervisor':
      return <SupervisorHome user={currentUser} />

    case 'intern':
    default:
      return <InternHome user={currentUser} />
  }
}*/