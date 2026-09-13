import { Link } from 'react-router-dom'
import { Card } from '../../lib/shadcn/card'
import { Badge } from '../../lib/shadcn/badge'
import { Button } from '../../lib/shadcn/button'
import { supervisorInternsDetailed, supervisorTodo } from '../data/dashboardMockData'
import { getCurrentUser } from '../../lib/auth'

export default function SupervisorHome() {
  const user = getCurrentUser()

  const cards = [
    { label: 'Mes stagiaires', value: supervisorInternsDetailed.length },
    { label: 'Stages actifs', value: supervisorInternsDetailed.filter((i) => i.status === 'En cours').length },
    { label: 'Tâches à vérifier', value: 7 },
  ]

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
          Bonjour, {user?.name ?? 'Encadrant'} 👋
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Voici un aperçu de vos stages et de vos stagiaires.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.label} className="rounded-3xl p-5 shadow-retool-sm">
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="mt-3 text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{c.value}</p>
          </Card>
        ))}
        <Card className="rounded-3xl p-5 shadow-retool-sm sm:col-span-3 sm:max-w-[220px]">
          <p className="text-sm text-muted-foreground">Rapports à revoir</p>
          <p className="mt-3 text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">2</p>
        </Card>
      </div>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mes stagiaires</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-3 pr-4">Stagiaire</th>
                <th className="pb-3 pr-4">Type</th>
                <th className="pb-3 pr-4">Entreprise</th>
                <th className="pb-3 pr-4">Progression</th>
                <th className="pb-3 pr-4">Statut</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {supervisorInternsDetailed.map((intern) => (
                <tr key={intern.id} className="border-b last:border-0">
                  <td className="py-3 pr-4 font-bold text-foreground">{intern.name}</td>
                  <td className="py-3 pr-4">
                    <Badge variant="outline" className="rounded-full">{intern.type}</Badge>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{intern.company}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{intern.progress}%</td>
                  <td className="py-3 pr-4">
                    <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{intern.status}</Badge>
                  </td>
                  <td className="py-3">
                    <Button asChild size="sm" variant="outline" className="rounded-lg">
                      <Link to="../stagiaires">Voir le profil</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mt-6 rounded-3xl p-6 shadow-retool-sm">
        <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">À faire</h2>
        <div className="mt-4 space-y-2">
          {supervisorTodo.map((item) => (
            <div key={item.text} className="flex items-center gap-3 rounded-xl border bg-background/70 p-3 text-sm font-semibold text-foreground">
              <span>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}