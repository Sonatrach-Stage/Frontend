import { useEffect, useState } from 'react'
import { Plus, Trash2, Pencil, X } from 'lucide-react'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Textarea } from '../../../lib/shadcn/textarea'
import {
  getSupervisorActivities,
  createSupervisorActivity,
  updateSupervisorActivity,
  deleteSupervisorActivity,
  type ApiActivity,
} from '../../../services/tasksActivities'

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<ApiActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<number | 'new' | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [interns, setInterns] = useState('')
  const [endDate, setEndDate] = useState('')

  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editInterns, setEditInterns] = useState('')
  const [editEndDate, setEditEndDate] = useState('')

  function loadActivities() {
    setLoading(true)
    getSupervisorActivities()
      .then((res) => setActivities(res.activities))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadActivities()
  }, [])

  async function handleCreate() {
    if (!title.trim() || !interns.trim() || !endDate) return
    setBusyId('new')
    setError('')
    try {
      await createSupervisorActivity({ title, description, interns, end_date: endDate })
      setTitle('')
      setDescription('')
      setInterns('')
      setEndDate('')
      loadActivities()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création')
    } finally {
      setBusyId(null)
    }
  }

  function startEdit(activity: ApiActivity) {
    setEditingId(activity.id)
    setEditTitle(activity.title)
    setEditDescription(activity.description)
    setEditInterns(activity.interns)
    setEditEndDate(activity.end_date)
  }

  async function handleSaveEdit(activityId: number) {
    setBusyId(activityId)
    setError('')
    try {
      await updateSupervisorActivity(activityId, {
        title: editTitle,
        description: editDescription,
        interns: editInterns,
        end_date: editEndDate,
      })
      setEditingId(null)
      loadActivities()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la modification')
    } finally {
      setBusyId(null)
    }
  }

  async function handleDelete(activityId: number) {
    if (!confirm('Supprimer cette activité ?')) return
    setBusyId(activityId)
    setError('')
    try {
      await deleteSupervisorActivity(activityId)
      setActivities((current) => current.filter((a) => a.id !== activityId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Activités</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
      </div>

      <Card className="mb-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Nouvelle activité</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" className="h-10 rounded-xl sm:col-span-2" />
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="rounded-xl sm:col-span-2" />
          <Input value={interns} onChange={(e) => setInterns(e.target.value)} placeholder="Stagiaires (ex. Katia Benali, Ahmed Slimani)" className="h-10 rounded-xl sm:col-span-2" />
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-10 rounded-xl" />
        </div>
        <Button disabled={busyId === 'new'} className="mt-4 rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={handleCreate}>
          <Plus className="h-4 w-4" /> {busyId === 'new' ? 'Création...' : "Créer l'activité"}
        </Button>
      </Card>

      {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
      {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

      {!loading && (
        <div className="space-y-3">
          {activities.map((activity) => (
            <Card key={activity.id} className="rounded-2xl p-4 shadow-retool-sm">
              {editingId === activity.id ? (
                <div className="space-y-3">
                  <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="h-10 rounded-xl" />
                  <Textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="rounded-xl" />
                  <Input value={editInterns} onChange={(e) => setEditInterns(e.target.value)} className="h-10 rounded-xl" />
                  <Input type="date" value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)} className="h-10 rounded-xl" />
                  <div className="flex gap-2">
                    <Button size="sm" disabled={busyId === activity.id} className="rounded-lg bg-[rgb(var(--intern-navy))] text-white" onClick={() => handleSaveEdit(activity.id)}>
                      Enregistrer
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-lg" onClick={() => setEditingId(null)}>
                      <X className="h-3.5 w-3.5" /> Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Stagiaires : {activity.interns} · Échéance {activity.end_date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="rounded-lg" onClick={() => startEdit(activity)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={busyId === activity.id}
                      className="rounded-lg text-red-600"
                      onClick={() => handleDelete(activity.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
          {activities.length === 0 && (
            <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
              Aucune activité créée pour le moment.
            </Card>
          )}
        </div>
      )}
    </>
  )
}