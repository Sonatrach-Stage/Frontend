import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { supervisors, companies } from '../../data/internPilotData'

export default function SupervisorsPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Encadrants</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {supervisors.map((sup) => {
          const company = companies.find((c) => c.id === sup.company_id)
          return (
            <Card key={sup.id} className="rounded-2xl p-5 shadow-retool-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgb(var(--intern-soft-blue))] font-black text-[rgb(var(--intern-navy))]">
                  {sup.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-foreground">{sup.name}</p>
                  <p className="text-xs text-muted-foreground">{company?.name}</p>
                </div>
              </div>
              <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                <p>{sup.job} · {sup.department}</p>
                <p>Spécialisation : {sup.specialization}</p>
                <p>{sup.years_of_experience} ans d'expérience · {sup.interns_count} stagiaires</p>
              </div>
              <Badge className="mt-4 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Actif</Badge>
            </Card>
          )
        })}
      </div>
    </>
  )
}