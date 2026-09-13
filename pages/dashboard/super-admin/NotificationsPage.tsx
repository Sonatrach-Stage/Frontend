import { NotificationsCenter } from '../shared/NotificationsCenter'
import { superAdminNotifications } from '../../data/dashboardMockData'

export default function NotificationsPage() {
  return <NotificationsCenter notifications={superAdminNotifications} />
}