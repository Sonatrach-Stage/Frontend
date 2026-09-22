import { Link } from 'react-router-dom'
import { Badge } from '../../../lib/shadcn/badge'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { getCurrentUser } from '../../../lib/auth'
import { accountValidationRequests, companyOngoingInternships } from '../../data/dashboardMockData'

export default function CompanyAdminHome() {
  const user = getCurrentUser()
  const pending = accountValidationRequests.filter((r) => r.status === 'En attente')

  const stats = [
    { icon: '', label: 'Stagiaires', value: '24', sub: '+3 ce mois' },
    { icon: '', label: 'Encadrants', value: '12', sub: '10 actifs' },
    { icon: '', label: 'À valider', value: String(pending.length), sub: 'Action requise' },
    { icon: '', label: 'Stages actifs', value: '18', sub: '' },
  ]

  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Bonjour {user?.name?.split(' ')[0] ?? 'Ahmed'} </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {user?.companyName ?? ''}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="rounded-xl"><Link to="offres">+ Nouvelle offre</Link></Button>
          <Button asChild className="rounded-xl bg-[rgb(var(--intern-navy))] text-white"><Link to="validations">Voir les demandes</Link></Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="rounded-3xl p-5 shadow-retool-sm">
            <p className="text-sm text-muted-foreground">{s.icon} {s.label}</p>
            <p className="mt-3 text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{s.value}</p>
            {s.sub && <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>}
          </Card>
        ))}
      </div>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Demandes de validation récentes</h2>
          <Button asChild size="sm" variant="outline" className="rounded-lg"><Link to="validations">Voir toutes les demandes</Link></Button>
        </div>
        <div className="mt-4 space-y-2">
          {pending.slice(0, 5).map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-xl border bg-background/70 p-3 text-sm">
              <span className="font-semibold text-foreground">{r.name}</span>
              <span className="text-muted-foreground">{r.role}{r.type ? ` ${r.type}` : ''}</span>
              <span className="text-muted-foreground">{r.date}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Stages en cours</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-2 pr-4">Stagiaire</th>
                <th className="pb-2 pr-4">Type</th>
                <th className="pb-2 pr-4">Encadrant</th>
                <th className="pb-2 pr-4">Sujet</th>
                <th className="pb-2 pr-4">Progression</th>
                <th className="pb-2">Statut</th>
              </tr>
            </thead>
            <tbody>
              {companyOngoingInternships.map((i) => (
                <tr key={i.intern} className="border-b last:border-0">
                  <td className="py-3 pr-4 font-bold text-foreground">{i.intern}</td>
                  <td className="py-3 pr-4"><Badge variant="outline" className="rounded-full">{i.type}</Badge></td>
                  <td className="py-3 pr-4 text-muted-foreground">{i.supervisor}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{i.subject}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{i.progress}%</td>
                  <td className="py-3"><Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{i.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}