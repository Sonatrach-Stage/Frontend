import { Bell, Check } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Button } from '../../../lib/shadcn/button'
import { cn } from '../../../lib/shadcn/utils'
import type { NotificationItem } from '../../data/dashboardMockData'

export function NotificationsCenter({ notifications }: { notifications: NotificationItem[] }) {
  return (
    <>
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Notifications</h1>
          <p className="mt-2 text-sm text-muted-foreground">Toutes vos notifications récentes.</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-lg">
          <Check className="h-3.5 w-3.5" />
          Tout marquer comme lu
        </Button>
      </div>

      <div className="space-y-2">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={cn(
              'flex items-start gap-3 rounded-2xl p-4 shadow-retool-sm',
              !n.read && 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))] dark:bg-secondary',
            )}
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card">
              <Bell className="h-4 w-4 text-[rgb(var(--intern-blue))]" />
            </div>
            <div className="flex-1">
              <p className={cn('text-sm', !n.read ? 'font-bold text-foreground' : 'text-muted-foreground')}>{n.text}</p>
              <p className="mt-1 text-xs text-muted-foreground">{n.date}</p>
            </div>
            {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[rgb(var(--intern-blue))]" />}
          </Card>
        ))}
      </div>
    </>
  )
}