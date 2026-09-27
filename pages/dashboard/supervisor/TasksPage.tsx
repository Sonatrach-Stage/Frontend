import { useEffect, useState } from 'react'
import { Plus, Trash2, Pencil, X } from 'lucide-react'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Textarea } from '../../../lib/shadcn/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../lib/shadcn/select'
import {
  getSupervisorTasks,
  createSupervisorTask,
  updateSupervisorTask,
  deleteSupervisorTask,
  type ApiTask,
} from '../../../services/tasksActivities'

const priorityColor: Record<string, string> = {
  high: 'text-red-600',
  medium: 'text-amber-600',
  low: 'text-muted-foreground',
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<ApiTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<number | 'new' | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)

  const [internName, setInternName] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [endDate, setEndDate] = useState('')

  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editPriority, setEditPriority] = useState('medium')
  const [editEndDate, setEditEndDate] = useState('')

  function loadTasks() {
    setLoading(true)
    getSupervisorTasks()
      .then((res) => setTasks(res.taches))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadTasks()
  }, [])

  async function handleCreate() {
    if (!internName.trim() || !title.trim() || !endDate) return
    setBusyId('new')
    setError('')
    try {
      await createSupervisorTask({ intern_name: internName, title, description, priority, end_date: endDate })
      setInternName('')
      setTitle('')
      setDescription('')
      setPriority('medium')
      setEndDate('')
      loadTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création')
    } finally {
      setBusyId(null)
    }
  }

  function startEdit(task: ApiTask) {
    setEditingId(task.id)
    setEditTitle(task.title)
    setEditDescription(task.description)
    setEditPriority(task.priority)
    setEditEndDate(task.end_date)
  }

  async function handleSaveEdit(taskId: number) {
    setBusyId(taskId)
    setError('')
    try {
      await updateSupervisorTask(taskId, {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
        end_date: editEndDate,
      })
      setEditingId(null)
      loadTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la modification')
    } finally {
      setBusyId(null)
    }
  }

  async function handleDelete(taskId: number) {
    if (!confirm('Supprimer cette tâche ?')) return
    setBusyId(taskId)
    setError('')
    try {
      await deleteSupervisorTask(taskId)
      setTasks((current) => current.filter((t) => t.id !== taskId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Tâches</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
      </div>

      <Card className="mb-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Nouvelle tâche</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input value={internName} onChange={(e) => setInternName(e.target.value)} placeholder="Nom du stagiaire (ex. Katia Benali)" className="h-10 rounded-xl sm:col-span-2" />
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" className="h-10 rounded-xl sm:col-span-2" />
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="rounded-xl sm:col-span-2" />
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="h-10 rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Basse</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="high">Haute</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-10 rounded-xl" />
        </div>
        <Button disabled={busyId === 'new'} className="mt-4 rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={handleCreate}>
          <Plus className="h-4 w-4" /> {busyId === 'new' ? 'Création...' : 'Créer la tâche'}
        </Button>
      </Card>

      {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
      {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

      {!loading && (
        <div className="space-y-3">
          {tasks.map((task) => (
            <Card key={task.id} className="rounded-2xl p-4 shadow-retool-sm">
              {editingId === task.id ? (
                <div className="space-y-3">
                  <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="h-10 rounded-xl" />
                  <Textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="rounded-xl" />
                  <div className="flex gap-3">
                    <Select value={editPriority} onValueChange={setEditPriority}>
                      <SelectTrigger className="h-10 rounded-xl"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Basse</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="high">Haute</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input type="date" value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)} className="h-10 rounded-xl" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" disabled={busyId === task.id} className="rounded-lg bg-[rgb(var(--intern-navy))] text-white" onClick={() => handleSaveEdit(task.id)}>
                      Enregistrer
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-lg" onClick={() => setEditingId(null)}>
                      <X className="h-3.5 w-3.5" /> Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-foreground">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <p className={`mt-1 text-xs font-semibold ${priorityColor[task.priority] ?? ''}`}>
                      Échéance {task.end_date} · Priorité {task.priority}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full">{task.status}</Badge>
                    <Button size="sm" variant="outline" className="rounded-lg" onClick={() => startEdit(task)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={busyId === task.id}
                      className="rounded-lg text-red-600"
                      onClick={() => handleDelete(task.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
          {tasks.length === 0 && (
            <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
              Aucune tâche créée pour le moment.
            </Card>
          )}
        </div>
      )}
    </>
  )
}