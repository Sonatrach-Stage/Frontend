import { Link } from 'react-router-dom'
import { Bot, FileUp, ListPlus, MessageSquare } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { getCurrentUser } from '../../../lib/auth'
import { internDeadlines } from '../../data/dashboardMockData'

export default function InternHome() {
  const user = getCurrentUser()

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
          Bonjour {user?.name?.split(' ')[0] ?? ''} 👋
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Voici un aperçu de votre stage.</p>
      </div>

      <Card className="rounded-3xl p-6 shadow-retool-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mon stage</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {user?.internType ?? 'PFE'} · {user?.companyName ?? '—'} · En cours
            </p>
            <p className="text-xs text-muted-foreground">01/09/2026 → 31/12/2026</p>
          </div>
          <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">En cours</Badge>
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-foreground">Progression du stage</span>
            <span className="text-muted-foreground">65%</span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-[rgb(var(--intern-blue))]" style={{ width: '65%' }} />
          </div>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Tâches terminées', value: '24' },
          { label: 'Activités réalisées', value: '12' },
          { label: 'Documents déposés', value: '8' },
          { label: 'Jours restants', value: '45' },
        ].map((s) => (
          <Card key={s.label} className="rounded-2xl p-4 text-center shadow-retool-sm">
            <p className="text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Prochaines échéances</h2>
          <div className="mt-4 space-y-2">
            {internDeadlines.map((d) => (
              <div key={d.text} className="flex items-center justify-between rounded-xl border bg-background/70 p-3 text-sm">
                <span className="font-semibold text-foreground">{d.icon} {d.text}</span>
                <span className="text-muted-foreground">{d.date}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mon encadrant</h2>
          <div className="mt-4 flex items-center gap-4 rounded-2xl bg-[rgb(var(--intern-soft-blue))] p-4 dark:bg-secondary">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card font-black text-[rgb(var(--intern-navy))]">AB</div>
            <div>
              <p className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Ahmed Benali</p>
              <p className="text-sm text-muted-foreground">Encadrant</p>
            </div>
          </div>
          <Button asChild className="mt-4 w-full rounded-xl bg-[rgb(var(--intern-navy))] text-white">
            <Link to="messages">
              <MessageSquare className="h-4 w-4" />
              Envoyer un message
            </Link>
          </Button>
        </Card>
      </div>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Actions rapides</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="activites"><ListPlus className="h-4 w-4" /> Ajouter une activité</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="taches"><ListPlus className="h-4 w-4" /> Ajouter une tâche</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="documents"><FileUp className="h-4 w-4" /> Déposer un document</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="messages"><MessageSquare className="h-4 w-4" /> Contacter mon encadrant</Link>
          </Button>
          <Button asChild className="rounded-xl bg-[rgb(var(--intern-navy))] text-white">
            <Link to="ia"><Bot className="h-4 w-4" /> Assistant IA</Link>
          </Button>
        </div>
      </Card>
    </>
  )
}