import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { cn } from '../../../lib/shadcn/utils'
import { supervisors } from '../../data/internPilotData'
import { internshipRequests } from '../../data/dashboardMockData'

export default function AssignmentsPage() {
  const [selectedIntern, setSelectedIntern] = useState<string | null>(null)
  const [selectedSupervisor, setSelectedSupervisor] = useState<number | null>(null)

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Affectations</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Le stagiaire ne choisit jamais son encadrant : c'est vous qui faites l'affectation.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Stagiaires acceptés</h2>
          <div className="mt-4 space-y-2">
            {internshipRequests.map((req) => (
              <button
                key={req.name}
                type="button"
                onClick={() => setSelectedIntern(req.name)}
                className={cn(
                  'w-full rounded-xl border p-3 text-left text-sm font-semibold transition-colors hover:border-[rgb(var(--intern-blue))]',
                  selectedIntern === req.name && 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))]',
                )}
              >
                {req.name} <span className="font-normal text-muted-foreground">· {req.formation}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="rounded-3xl p-6 shadow-retool-sm">
          <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Encadrants disponibles</h2>
          <div className="mt-4 space-y-2">
            {supervisors.map((sup) => (
              <button
                key={sup.id}
                type="button"
                onClick={() => setSelectedSupervisor(sup.id)}
                className={cn(
                  'w-full rounded-xl border p-3 text-left text-sm font-semibold transition-colors hover:border-[rgb(var(--intern-blue))]',
                  selectedSupervisor === sup.id && 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))]',
                )}
              >
                {sup.name} <span className="font-normal text-muted-foreground">· {sup.job}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <Button
        disabled={!selectedIntern || !selectedSupervisor}
        className="mt-6 rounded-xl bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy-deep))]"
        onClick={() => {
          alert(`${selectedIntern} affecté à l'encadrant sélectionné. Notifications envoyées.`)
          setSelectedIntern(null)
          setSelectedSupervisor(null)
        }}
      >
        Affecter l'encadrant
        <ArrowRight className="h-4 w-4" />
      </Button>
    </>
  )
}