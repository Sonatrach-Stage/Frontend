import { useEffect, useState } from 'react'
import { Download, Eye, X } from 'lucide-react'
import { Badge } from '../../../lib/shadcn/badge'
import { Card } from '../../../lib/shadcn/card'
import { Button } from '../../../lib/shadcn/button'
import { Textarea } from '../../../lib/shadcn/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../lib/shadcn/select'
import { getPendingDocuments, reviewDocument, type PendingDocument } from '../../../api/documents'

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<PendingDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reviewingId, setReviewingId] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState<'APPROVED' | 'REVISION_REQUIRED' | 'REJECTED'>('APPROVED')
  const [submitting, setSubmitting] = useState(false)

  function loadDocuments() {
    setLoading(true)
    getPendingDocuments()
      .then((res) => setDocuments(res.documents))
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  function startReview(doc: PendingDocument) {
    setReviewingId(doc.id)
    setComment('')
    setStatus('APPROVED')
  }

  async function submitReview(doc: PendingDocument) {
    setSubmitting(true)
    setError('')
    try {
      await reviewDocument(doc.id, { version_id: doc.version_id, status, comment })
      setReviewingId(null)
      loadDocuments()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'évaluation")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Documents à traiter</h1>
        <p className="mt-2 text-sm text-muted-foreground">Documents en attente de vos stagiaires affectés.</p>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
      {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

      {!loading && (
        <div className="space-y-3">
          {documents.map((doc) => (
            <Card key={doc.id} className="rounded-2xl p-5 shadow-retool-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-foreground">{doc.title}</p>
                  <p className="text-sm text-muted-foreground">{doc.intern_name} · {doc.document_type} · V{doc.version_number}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{doc.file_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full text-amber-600">🟡 {doc.status}</Badge>
                  <a href={doc.file_url} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="outline" className="rounded-lg"><Eye className="h-3.5 w-3.5" /></Button>
                  </a>
                  <a href={doc.file_url} download>
                    <Button size="sm" variant="outline" className="rounded-lg"><Download className="h-3.5 w-3.5" /></Button>
                  </a>
                  {reviewingId !== doc.id && (
                    <Button size="sm" className="rounded-lg bg-[rgb(var(--intern-navy))] text-white" onClick={() => startReview(doc)}>
                      Évaluer
                    </Button>
                  )}
                </div>
              </div>

              {reviewingId === doc.id && (
                <div className="mt-4 rounded-xl border bg-background/70 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">Évaluation</p>
                    <button type="button" onClick={() => setReviewingId(null)} className="rounded-full p-1 hover:bg-muted">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                    <SelectTrigger className="mt-3 h-10 rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="APPROVED">Approuvé</SelectItem>
                      <SelectItem value="REVISION_REQUIRED">Corrections demandées</SelectItem>
                      <SelectItem value="REJECTED">Rejeté</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Commentaire pour le stagiaire"
                    className="mt-3 rounded-xl"
                  />
                  <Button
                    disabled={submitting}
                    className="mt-3 rounded-xl bg-[rgb(var(--intern-navy))] text-white"
                    onClick={() => submitReview(doc)}
                  >
                    {submitting ? 'Envoi...' : "Enregistrer l'évaluation"}
                  </Button>
                </div>
              )}
            </Card>
          ))}
          {documents.length === 0 && (
            <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
              Aucun document en attente.
            </Card>
          )}
        </div>
      )}
    </>
  )
}