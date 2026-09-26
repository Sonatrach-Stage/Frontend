import { useEffect, useState } from 'react'
import { Bell, Check, Trash2 } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Button } from '../../../lib/shadcn/button'
import { cn } from '../../../lib/shadcn/utils'
import {
  getMyNotifications,
  markAllAsRead,
  markAsRead,
  deleteNotification,
  type ApiNotification,
} from '../../../api/notifications'

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return "À l'instant"
  if (minutes < 60) return `Il y a ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `Il y a ${hours} h`
  const days = Math.floor(hours / 24)
  return `Il y a ${days} j`
}

export function NotificationsCenter() {
  const [notifications, setNotifications] = useState<ApiNotification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<number | null>(null)
  const [markingAll, setMarkingAll] = useState(false)

  function loadNotifications() {
    setLoading(true)
    getMyNotifications()
      .then((res) => setNotifications(res.notifications))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadNotifications()
  }, [])

  async function handleMarkAllRead() {
    setMarkingAll(true)
    try {
      await markAllAsRead()
      setNotifications((current) => current.map((n) => ({ ...n, is_read: true })))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setMarkingAll(false)
    }
  }

  async function handleMarkRead(id: number) {
    setBusyId(id)
    try {
      await markAsRead(id)
      setNotifications((current) => current.map((n) => (n.id === id ? { ...n, is_read: true } : n)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setBusyId(null)
    }
  }

  async function handleDelete(id: number) {
    setBusyId(id)
    try {
      await deleteNotification(id)
      setNotifications((current) => current.filter((n) => n.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setBusyId(null)
    }
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length

  return (
    <>
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Notifications</h1>
          <p className="mt-2 text-sm text-muted-foreground">Toutes vos notifications récentes.</p>
        </div>
        <Button variant="outline" size="sm" disabled={markingAll || unreadCount === 0} className="rounded-lg" onClick={handleMarkAllRead}>
          <Check className="h-3.5 w-3.5" />
          Tout marquer comme lu
        </Button>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
      {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

      {!loading && (
        <div className="space-y-2">
          {notifications.map((n) => (
            <Card
              key={n.id}
              className={cn(
                'flex items-start gap-3 rounded-2xl p-4 shadow-retool-sm',
                !n.is_read && 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))] dark:bg-secondary',
              )}
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card">
                <Bell className="h-4 w-4 text-[rgb(var(--intern-blue))]" />
              </div>
              <div className="flex-1">
                <p className={cn('text-sm font-bold', n.is_read ? 'text-foreground' : 'text-[rgb(var(--intern-navy))] dark:text-foreground')}>
                  {n.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{n.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">{timeAgo(n.created_at)}</p>
              </div>
              <div className="flex items-center gap-2">
                {!n.is_read && (
                  <button
                    type="button"
                    disabled={busyId === n.id}
                    onClick={() => handleMarkRead(n.id)}
                    className="rounded-full p-1.5 hover:bg-muted"
                    aria-label="Marquer comme lu"
                  >
                    <Check className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                )}
                <button
                  type="button"
                  disabled={busyId === n.id}
                  onClick={() => handleDelete(n.id)}
                  className="rounded-full p-1.5 hover:bg-muted"
                  aria-label="Supprimer"
                >
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-red-600" />
                </button>
              </div>
            </Card>
          ))}
          {notifications.length === 0 && (
            <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
              Aucune notification pour le moment.
            </Card>
          )}
        </div>
      )}
    </>
  )
}