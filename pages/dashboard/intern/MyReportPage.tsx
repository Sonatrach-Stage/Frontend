import { useRef, useState } from 'react'
import { FileText, Upload, X } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'

type UploadedReport = {
  file: File
  version: number
  status: 'Brouillon' | 'Soumis'
}

export default function MyReportPage() {
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
    setReport((current) => ({ file, version: (current?.version ?? 0) + 1, status: 'Brouillon' }))
  }

  function submitReport() {
    if (!report) return
    setReport({ ...report, status: 'Soumis' })
  }

  function removeReport() {
    setReport(null)
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mon rapport / mémoire</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Déposez votre document. Il sera transmis à votre encadrant pour validation.
        </p>
      </div>

      <Card className="max-w-2xl rounded-3xl p-8 shadow-retool-sm">
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
                <button type="button" onClick={removeReport} className="rounded-full p-1.5 hover:bg-muted" aria-label="Supprimer">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button type="button" variant="outline" className="rounded-xl" onClick={() => inputRef.current?.click()}>
                Remplacer
              </Button>
              <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
              {report.status === 'Brouillon' && (
                <Button type="button" className="rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={submitReport}>
                  Soumettre pour validation
                </Button>
              )}
            </div>

            {report.status === 'Soumis' && (
              <p className="mt-4 text-sm text-emerald-600">
                ✅ Document soumis. Vous serez notifié dès que votre encadrant l'aura examiné.
              </p>
            )}
          </div>
        )}
      </Card>
    </>
  )
}