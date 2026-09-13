import { NotificationsCenter } from '../shared/NotificationsCenter'
import { companyAdminNotifications } from '../../data/dashboardMockData'

export default function NotificationsPage() {
  return <NotificationsCenter notifications={companyAdminNotifications} />
}