import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Trash2, Upload } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { cn } from '../../../lib/shadcn/utils'
import {
  getDocumentDetails,
  getDocumentVersions,
  getDocumentReviews,
  addDocumentVersion,
  deleteDocument,
  type ApiDocument,
  type DocumentVersion,
  type DocumentReview,
} from '../../../services/documents'

const statusLabel: Record<string, { text: string; color: string }> = {
  PENDING: { text: 'En attente de review', color: 'text-amber-600' },
  APPROVED: { text: 'Validé', color: 'text-emerald-600' },
  REVISION_REQUIRED: { text: 'Corrections demandées', color: 'text-orange-600' },
  REJECTED: { text: 'Rejeté', color: 'text-red-600' },
}

export default function DocumentDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const documentId = Number(id)
  const inputRef = useRef<HTMLInputElement>(null)

  const [document, setDocument] = useState<ApiDocument | null>(null)
  const [versions, setVersions] = useState<DocumentVersion[]>([])
  const [reviews, setReviews] = useState<DocumentReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  function loadAll() {
    setLoading(true)
    setError('')
    Promise.all([
      getDocumentDetails(documentId),
      getDocumentVersions(documentId),
      getDocumentReviews(documentId),
    ])
      .then(([docRes, versionsRes, reviewsRes]) => {
        setDocument(docRes.document)
        setVersions(versionsRes.versions)
        setReviews(reviewsRes.reviews)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId])

  async function handleUploadVersion(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      await addDocumentVersion(documentId, file)
      loadAll()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi du fichier")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  async function handleDeleteDocument() {
    if (!confirm('Supprimer ce document et toutes ses versions ? Cette action est irréversible.')) return
    try {
      await deleteDocument(documentId)
      navigate('..')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    }
  }

  if (loading) return <p className="text-sm text-muted-foreground">Chargement...</p>
  if (error && !document) return <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>
  if (!document) return null

  const status = statusLabel[document.status ?? ''] ?? { text: document.status ?? 'Non soumis', color: 'text-muted-foreground' }

  return (
    <>
      <Button variant="outline" className="mb-6 rounded-xl" onClick={() => navigate('..')}>
        <ArrowLeft className="h-4 w-4" /> Retour à mes documents
      </Button>

      <Card className="rounded-3xl p-6 shadow-retool-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{document.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{document.description}</p>
            <p className="mt-2 text-xs text-muted-foreground">Type : {document.document_type}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn('rounded-full', status.color)}>{status.text}</Badge>
            <Button size="sm" variant="outline" className="rounded-lg text-red-600" onClick={handleDeleteDocument}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </Card>

      {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Versions</h2>
            <Button size="sm" disabled={uploading} className="rounded-lg bg-[rgb(var(--intern-navy))] text-white" onClick={() => inputRef.current?.click()}>
              <Upload className="h-3.5 w-3.5" /> {uploading ? 'Envoi...' : 'Nouvelle version'}
            </Button>
            <input ref={inputRef} type="file" className="hidden" onChange={handleUploadVersion} />
          </div>
          <div className="mt-4 space-y-2">
            {[...versions].reverse().map((v) => (
              <div key={v.id} className="flex items-center justify-between rounded-xl border bg-background/70 p-3 text-sm">
                <div>
                  <p className="font-bold text-foreground">V{v.version_number} — {v.file_name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(v.created_at).toLocaleString('fr-FR')}</p>
                </div>
                <a href={v.file_url} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="outline" className="rounded-lg"><Download className="h-3.5 w-3.5" /></Button>
                </a>
              </div>
            ))}
            {versions.length === 0 && <p className="text-sm text-muted-foreground">Aucune version envoyée pour le moment.</p>}
          </div>
        </Card>

        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Commentaires de l'encadrant</h2>
          <div className="mt-4 space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-xl border bg-background/70 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={cn('rounded-full', statusLabel[r.status]?.color)}>{statusLabel[r.status]?.text ?? r.status}</Badge>
                  <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString('fr-FR')}</span>
                </div>
                <p className="mt-2 text-foreground">{r.comment}</p>
              </div>
            ))}
            {reviews.length === 0 && <p className="text-sm text-muted-foreground">Aucun commentaire pour le moment.</p>}
          </div>
        </Card>
      </div>
    </>
  )
}