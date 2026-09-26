import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, FileText, Search, Upload } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { Input } from '../../../lib/shadcn/input'
import { Textarea } from '../../../lib/shadcn/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../lib/shadcn/select'
import { cn } from '../../../lib/shadcn/utils'
import { getCurrentUser } from '../../../lib/auth'
import { createDocument, addDocumentVersion, getMyDocuments, searchDocuments, type ApiDocument, type PendingDocument } from '../../../api/documents'

const statusLabel: Record<string, { text: string; color: string }> = {
  PENDING: { text: 'En attente de review', color: 'text-amber-600' },
  APPROVED: { text: 'Validé', color: 'text-emerald-600' },
  REVISION_REQUIRED: { text: 'Corrections demandées', color: 'text-orange-600' },
  REJECTED: { text: 'Rejeté', color: 'text-red-600' },
}

const baseTypes = ['brouillon', 'specification', 'diagramme', 'presentation', 'rapport_hebdomadaire', 'memoire', 'projet', 'autre']

export default function MyDocumentsPage() {
  const user = getCurrentUser()
  const finalType = user?.internType === 'PFE' ? 'FINAL_THESIS' : 'FINAL_REPORT'
  const documentTypes = [...baseTypes, finalType]

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [documents, setDocuments] = useState<ApiDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [documentType, setDocumentType] = useState('brouillon')
  const [taskTitle, setTaskTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [creating, setCreating] = useState(false)

  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<PendingDocument[] | null>(null)
  const [searching, setSearching] = useState(false)

  function loadDocuments() {
    setLoading(true)
    getMyDocuments()
      .then((res) => setDocuments(res.documents))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0]
    if (selected) setFile(selected)
  }

  async function handleCreate() {
    if (!title.trim() || !documentType) return
    setCreating(true)
    setError('')
    try {
      const res = await createDocument({
        title,
        description,
        document_type: documentType,
        ...(taskTitle.trim() ? { task_title: taskTitle } : {}),
      })

      if (file) {
        await addDocumentVersion(res.document.id, file)
      }

      setTitle('')
      setDescription('')
      setTaskTitle('')
      setDocumentType('brouillon')
      setFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      loadDocuments()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création')
    } finally {
      setCreating(false)
    }
  }

  async function handleSearch() {
    if (!search.trim()) {
      setSearchResults(null)
      return
    }
    setSearching(true)
    try {
      const res = await searchDocuments(search)
      setSearchResults(res.documents)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de recherche')
    } finally {
      setSearching(false)
    }
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mes documents</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Créez vos documents, déposez vos fichiers et suivez les retours de votre encadrant.
        </p>
      </div>

      <Card className="mb-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Nouveau document</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre (ex. Architecture du projet)" className="h-10 rounded-xl sm:col-span-2" />
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="rounded-xl sm:col-span-2" />
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger className="h-10 rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              {documentTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Lier à une tâche (optionnel)" className="h-10 rounded-xl" />
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold text-foreground"></p>
          <div
            className={cn(
              'flex items-center gap-3 rounded-xl border border-dashed p-4',
              file ? 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))]' : 'bg-background/60',
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card text-[rgb(var(--intern-blue))]">
              {file ? <FileText className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{file ? file.name : 'Aucun fichier sélectionné'}</p>
              <p className="text-xs text-muted-foreground">{file ? `${(file.size / (1024 * 1024)).toFixed(2)} Mo` : 'PDF, DOC, image...'}</p>
            </div>
            <Button type="button" variant="outline" size="sm" className="rounded-lg" onClick={() => fileInputRef.current?.click()}>
              {file ? 'Changer' : 'Choisir un fichier'}
            </Button>
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} />
          </div>
        </div>

        {error && <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

        <Button disabled={creating} className="mt-4 rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={handleCreate}>
          <Plus className="h-4 w-4" /> {creating ? 'Envoi en cours...' : 'Créer le document'}
        </Button>
      </Card>

      <div className="mb-5 flex gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Rechercher dans mes documents..."
            className="h-10 rounded-2xl pl-11 shadow-sm"
          />
        </div>
        <Button variant="outline" className="rounded-xl" disabled={searching} onClick={handleSearch}>
          {searching ? '...' : 'Rechercher'}
        </Button>
        {searchResults && (
          <Button variant="outline" className="rounded-xl" onClick={() => { setSearch(''); setSearchResults(null) }}>
            Effacer
          </Button>
        )}
      </div>

      {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}

      {!loading && (
        <div className="space-y-3">
          {(searchResults ?? documents).map((doc) => {
            const status = statusLabel[doc.status ?? ''] ?? { text: doc.status ?? 'Non soumis', color: 'text-muted-foreground' }
            return (
              <Link key={doc.id} to={`${doc.id}`}>
                <Card className="rounded-2xl p-4 shadow-retool-sm hover:border-[rgb(var(--intern-blue))]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))]">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">{doc.document_type}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn('rounded-full', status.color)}>{status.text}</Badge>
                  </div>
                </Card>
              </Link>
            )
          })}
          {(searchResults ?? documents).length === 0 && (
            <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
              Aucun document pour le moment.
            </Card>
          )}
        </div>
      )}
    </>
  )
}