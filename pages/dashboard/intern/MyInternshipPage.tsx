import { FileCheck2 } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { getCurrentUser } from '../../../lib/auth'

const timeline = ['Inscription', 'Validation', 'Entreprise', 'Encadrant affecté', 'Stage en cours', 'Rapport / Mémoire', 'Validation finale']

export default function MyInternshipPage() {
  const user = getCurrentUser()

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mon stage</h1>
      </div>

      <Card className="rounded-3xl p-6 shadow-retool-sm">
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <p>Type : <Badge variant="outline" className="rounded-full">{user?.internType ?? 'PFE'}</Badge></p>
          <p>Statut : <span className="font-semibold text-emerald-600">En cours</span></p>
          <p>Sujet : <span className="font-semibold text-foreground">Application RH</span></p>
          <p>Entreprise : <span className="font-semibold text-foreground">{user?.companyName ?? '—'}</span></p>
          <p>Début : 01/09/2026</p>
          <p>Fin : 30/09/2026</p>
        </div>
      </Card>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Convention de stage</h2>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))]">
            <FileCheck2 className="h-5 w-5" />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-foreground">✓ Déposée</p>
            <p className="font-semibold text-emerald-600">✓ Validée par l'entreprise</p>
            <p className="font-semibold text-emerald-600">✓ Validée par l'université</p>
          </div>
        </div>
        <Button variant="outline" className="mt-4 rounded-xl">Voir la convention</Button>
      </Card>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Progression du parcours</h2>
        <div className="mt-5 space-y-3">
          {timeline.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i < 4 ? 'bg-[rgb(var(--intern-blue))] text-white' : 'bg-muted text-muted-foreground'}`}>
                {i + 1}
              </div>
              <p className={`text-sm ${i < 4 ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{step}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}