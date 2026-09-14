import { useMemo, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { Input } from '../../../lib/shadcn/input'
import { cn } from '../../../lib/shadcn/utils'
import { supervisors } from '../../data/internPilotData'
import { internshipRequestsWithDept } from '../../data/dashboardMockData'

export default function AssignmentsPage() {
  const departments = useMemo(() => [...new Set(supervisors.map((s) => s.department))], [])

  const [department, setDepartment] = useState<string | 'Tous' | null>(null)
  const [assignments, setAssignments] = useState<{ intern: string; supervisor: string; department: string }[]>([
    { intern: 'Ahmed Kaci', supervisor: 'Karim Bennani', department: 'IT' },
  ])
  const [selectedInterns, setSelectedInterns] = useState<string[]>([])
  const [selectedSupervisor, setSelectedSupervisor] = useState<number | null>(null)

  const assignedInternNames = assignments.map((a) => a.intern)
  const showAll = department === 'Tous'

  const deptSupervisors = showAll ? supervisors : department ? supervisors.filter((s) => s.department === department) : []
  const deptInterns = showAll
    ? internshipRequestsWithDept
    : department
    ? internshipRequestsWithDept.filter((i) => i.department === department)
    : []

  function toggleIntern(name: string) {
    if (assignedInternNames.includes(name)) return
    setSelectedInterns((current) => (current.includes(name) ? current.filter((n) => n !== name) : [...current, name]))
  }

  function assign() {
    const supervisor = supervisors.find((s) => s.id === selectedSupervisor)
    if (selectedInterns.length === 0 || !supervisor) return
    setAssignments((current) => [
      ...current,
      ...selectedInterns.map((intern) => ({ intern, supervisor: supervisor.name, department: supervisor.department })),
    ])
    setSelectedInterns([])
    setSelectedSupervisor(null)
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Affectations</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choisissez un département, ou "Tous" pour voir tous les encadrants et stagiaires. Un stagiaire n'a qu'un
          encadrant ; un encadrant peut avoir plusieurs stagiaires.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => { setDepartment('Tous'); setSelectedInterns([]); setSelectedSupervisor(null) }}
          className={cn(
            'rounded-xl border px-4 py-2 text-sm font-semibold transition-colors',
            department === 'Tous' ? 'border-[rgb(var(--intern-navy))] bg-[rgb(var(--intern-navy))] text-white' : 'hover:bg-muted',
          )}
        >
          Tous
        </button>
        {departments.map((dept) => (
          <button
            key={dept}
            type="button"
            onClick={() => { setDepartment(dept); setSelectedInterns([]); setSelectedSupervisor(null) }}
            className={cn(
              'rounded-xl border px-4 py-2 text-sm font-semibold transition-colors',
              department === dept ? 'border-[rgb(var(--intern-navy))] bg-[rgb(var(--intern-navy))] text-white' : 'hover:bg-muted',
            )}
          >
            {dept}
          </button>
        ))}
      </div>

      {!department ? (
        <Card className="rounded-2xl border-dashed p-10 text-center text-sm text-muted-foreground">
          Sélectionnez un département, ou "Tous" pour tout afficher.
        </Card>
      ) : (
        <>
          <Card className="mb-6 rounded-3xl p-6 shadow-retool-sm">
            <h2 className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
              {showAll ? 'Tous les départements' : `Département ${department}`} — nouvelle affectation
            </h2>

            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-semibold text-foreground">Stagiaires (sélection multiple)</p>
                <div className="max-h-52 space-y-1.5 overflow-y-auto rounded-xl border p-2">
                  {deptInterns.length === 0 && <p className="p-3 text-sm text-muted-foreground">Aucun stagiaire.</p>}
                  {deptInterns.map((intern) => {
                    const alreadyAssigned = assignedInternNames.includes(intern.name)
                    const selected = selectedInterns.includes(intern.name)
                    return (
                      <button
                        key={intern.name}
                        type="button"
                        disabled={alreadyAssigned}
                        onClick={() => toggleIntern(intern.name)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold',
                          alreadyAssigned ? 'cursor-not-allowed opacity-50' : 'hover:bg-muted',
                          selected && 'bg-[rgb(var(--intern-soft-blue))]',
                        )}
                      >
                        <span>{intern.name} <span className="font-normal text-muted-foreground">· {intern.formation}{showAll ? ` · ${intern.department}` : ''}</span></span>
                        {selected && <Check className="h-4 w-4 text-[rgb(var(--intern-blue))]" />}
                        {alreadyAssigned && <Badge variant="outline" className="rounded-full text-xs">Déjà affecté</Badge>}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-foreground">Encadrants</p>
                <div className="max-h-52 space-y-1.5 overflow-y-auto rounded-xl border p-2">
                  {deptSupervisors.length === 0 && <p className="p-3 text-sm text-muted-foreground">Aucun encadrant.</p>}
                  {deptSupervisors.map((sup) => (
                    <button
                      key={sup.id}
                      type="button"
                      onClick={() => setSelectedSupervisor(sup.id)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold hover:bg-muted',
                        selectedSupervisor === sup.id && 'bg-[rgb(var(--intern-soft-blue))]',
                      )}
                    >
                      <span>{sup.name} <span className="font-normal text-muted-foreground">· {sup.interns_count} stagiaires{showAll ? ` · ${sup.department}` : ''}</span></span>
                      {selectedSupervisor === sup.id && <Check className="h-4 w-4 text-[rgb(var(--intern-blue))]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              className="mt-5 rounded-xl bg-[rgb(var(--intern-navy))] text-white"
              disabled={selectedInterns.length === 0 || !selectedSupervisor}
              onClick={assign}
            >
              Affecter {selectedInterns.length > 1 ? `(${selectedInterns.length} stagiaires)` : ''}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>

          <Card className="overflow-x-auto rounded-3xl p-2 shadow-retool-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="p-4">Stagiaire</th>
                  <th className="p-4">Encadrant</th>
                  {showAll && <th className="p-4">Département</th>}
                  <th className="p-4">Statut</th>
                </tr>
              </thead>
              <tbody>
                {assignments.filter((a) => showAll || a.department === department).map((a, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="p-4 font-bold text-foreground">{a.intern}</td>
                    <td className="p-4 text-muted-foreground">{a.supervisor}</td>
                    {showAll && <td className="p-4 text-muted-foreground">{a.department}</td>}
                    <td className="p-4"><Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Actif</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}
    </>
  )
}