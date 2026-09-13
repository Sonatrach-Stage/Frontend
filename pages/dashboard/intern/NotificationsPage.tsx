import { NotificationsCenter } from '../shared/NotificationsCenter'
import { internNotifications } from '../../data/dashboardMockData'

export default function NotificationsPage() {
  return <NotificationsCenter notifications={internNotifications} />
}