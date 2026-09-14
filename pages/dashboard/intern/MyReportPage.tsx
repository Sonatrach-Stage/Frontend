import { useRef, useState } from 'react'
import { Download, Eye, FileText, Upload, X } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { getCurrentUser } from '../../../lib/auth'
import { internReportHistory, theses } from '../../data/dashboardMockData'

type UploadedReport = { file: File; version: number; status: 'Brouillon' | 'Soumis' }

export default function MyReportPage() {
  const user = getCurrentUser()
  const isPFE = (user?.internType ?? 'PFE') === 'PFE'
  const inputRef = useRef<HTMLInputElement>(null)
  const [report, setReport] = useState<UploadedReport | null>(null)
  const [error, setError] = useState('')

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const isPdf = file.type === 'application/pdf'
    const isDoc = file.name.endsWith('.doc') || file.name.endsWith('.docx')
    if (!isPdf && !isDoc) {
      setError('Veuillez déposer un fichier PDF ou DOC/DOCX.')
      return
    }
    if (file.size > 15 * 1024 * 1024) {
      setError('Le fichier ne doit pas dépasser 15 Mo.')
      return
    }
    setError('')
    setReport((current) => ({ file, version: (current?.version ?? internReportHistory.length) + 1, status: 'Brouillon' }))
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
          {isPFE ? 'Mon mémoire (PFE)' : 'Mon rapport (PFC)'}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Déposez votre document, il sera transmis à votre encadrant pour validation.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl p-8 shadow-retool-sm">
          {!report ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-background/60 p-10 text-center">
              <Upload className="h-8 w-8 text-[rgb(var(--intern-blue))]" />
              <p className="mt-4 font-bold text-[rgb(var(--intern-navy))] dark:text-foreground">Déposez votre fichier ici</p>
              <p className="mt-1 text-xs text-muted-foreground">PDF, DOC ou DOCX — 15 Mo maximum</p>
              <Button type="button" variant="outline" className="mt-5 rounded-xl" onClick={() => inputRef.current?.click()}>
                Parcourir les fichiers
              </Button>
              <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
              {error && <p className="mt-3 text-xs font-semibold text-red-600">{error}</p>}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between rounded-2xl border bg-background/70 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="max-w-xs truncate font-bold text-foreground">{report.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(report.file.size / (1024 * 1024)).toFixed(2)} Mo · Version {report.version}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full">{report.status}</Badge>
                  <button type="button" onClick={() => setReport(null)} className="rounded-full p-1.5 hover:bg-muted" aria-label="Supprimer">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button type="button" variant="outline" className="rounded-xl" onClick={() => inputRef.current?.click()}>Remplacer</Button>
                <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
                {report.status === 'Brouillon' && (
                  <Button
                    type="button"
                    className="rounded-xl bg-[rgb(var(--intern-navy))] text-white"
                    onClick={() => setReport({ ...report, status: 'Soumis' })}
                  >
                    Soumettre pour validation
                  </Button>
                )}
              </div>
            </div>
          )}
        </Card>

        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Historique des versions</h2>
          <div className="mt-4 space-y-3">
            {internReportHistory.map((v) => (
              <div key={v.version} className="rounded-xl border bg-background/70 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-foreground">Version {v.version} — {v.date}</p>
                  <Badge variant="outline" className="rounded-full">{v.status}</Badge>
                </div>
                {v.comment && (
                  <p className="mt-2 rounded-lg bg-amber-50 p-2 text-xs text-amber-700">
                    Commentaire de l'encadrant : {v.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
          Tous les rapports et mémoires publiés
        </h2>
        <div className="space-y-3">
          {theses.filter((t) => t.published).map((t) => (
            <Card key={t.id} className="rounded-2xl p-4 shadow-retool-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-foreground">{t.title}</p>
                  <p className="text-sm text-muted-foreground">{t.intern} · {t.company} · {t.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{t.status}</Badge>
                  <Button size="sm" variant="outline" className="rounded-lg"><Eye className="h-3.5 w-3.5" /></Button>
                  <Button size="sm" variant="outline" className="rounded-lg"><Download className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            </Card>
          ))}
          {theses.filter((t) => t.published).length === 0 && (
            <Card className="rounded-2xl border-dashed p-8 text-center text-sm text-muted-foreground">
              Aucun document publié pour le moment.
            </Card>
          )}
        </div>
      </div>
    </>
  )
}