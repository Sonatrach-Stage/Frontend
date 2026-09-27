import { useEffect, useState } from 'react'
import { Card } from '../../../lib/shadcn/card'
import { getInternActivities, type ApiActivity } from '../../../services/tasksActivities'

export default function MyActivitiesPage() {
  const [activities, setActivities] = useState<ApiActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getInternActivities()
      .then((res) => setActivities(res.activities))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mes activités</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
      {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="space-y-3">
          {activities.map((activity) => (
            <Card key={activity.id} className="rounded-2xl p-4 shadow-retool-sm">
              <p className="font-bold text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">Échéance {activity.end_date}</p>
            </Card>
          ))}
          {activities.length === 0 && (
            <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
              Aucune activité pour le moment.
            </Card>
          )}
        </div>
      )}
    </>
  )
}