import { NotificationsCenter } from '../shared/NotificationsCenter'
import { supervisorNotifications } from '../../data/dashboardMockData'

export default function NotificationsPage() {
  return <NotificationsCenter notifications={supervisorNotifications} />
}