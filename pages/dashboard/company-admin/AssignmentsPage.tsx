import { useMemo, useState } from 'react'
import { assignSupervisorToIntern } from '../../../services/adminsec'
import { ArrowRight, Check } from 'lucide-react'

import { Button } from '../../../lib/shadcn/button'
import { Card } from '../../../lib/shadcn/card'
import { Badge } from '../../../lib/shadcn/badge'
import { cn } from '../../../lib/shadcn/utils'

import { supervisors } from '../../data/internPilotData'
import { internshipRequestsWithDept } from '../../data/dashboardMockData'

export default function AssignmentsPage() {
  const departments = useMemo(
    () => [...new Set(supervisors.map((s) => s.department))],
    [],
  )

  const [department, setDepartment] = useState<string | 'Tous' | null>(null)

  const [assignments, setAssignments] = useState<
    {
      intern: string
      supervisor: string
      department: string
    }[]
  >([
    {
      intern: 'Ahmed Kaci',
      supervisor: 'Karim Bennani',
      department: 'IT',
    },
  ])

  const [selectedInterns, setSelectedInterns] = useState<string[]>([])
  const [selectedSupervisor, setSelectedSupervisor] = useState<number | null>(
    null,
  )

  const assignedInternNames = assignments.map((a) => a.intern)

  const showAll = department === 'Tous'

  const deptSupervisors = showAll
    ? supervisors
    : department
      ? supervisors.filter((s) => s.department === department)
      : []

  const deptInterns = showAll
    ? internshipRequestsWithDept
    : department
      ? internshipRequestsWithDept.filter(
          (i) => i.department === department,
        )
      : []

  function toggleIntern(name: string) {
    if (assignedInternNames.includes(name)) return

    setSelectedInterns((current) =>
      current.includes(name)
        ? current.filter((n) => n !== name)
        : [...current, name],
    )
  }

  // ============================================================
  // AFFECTATION VIA API
  // ============================================================

  async function assign() {
    const supervisor = supervisors.find(
      (s) => s.id === selectedSupervisor,
    )

    if (selectedInterns.length === 0 || !supervisor) return

    try {
      // Appelle l'API pour chaque stagiaire sélectionné
      await Promise.all(
        selectedInterns.map((internName) => {
          // ⚠️ Pour le moment, l'ID est calculé à partir
          // de la position du stagiaire dans les données locales.
          // À remplacer par intern.id lorsque les stagiaires
          // seront récupérés directement depuis l'API.

          const internId =
            internshipRequestsWithDept.findIndex(
              (i) => i.name === internName,
            ) + 1

          if (internId <= 0) {
            throw new Error(
              `Stagiaire introuvable : ${internName}`,
            )
          }

          return assignSupervisorToIntern(
            internId,
            supervisor.name,
          )
        }),
      )

      // Mise à jour de l'affichage local après
      // confirmation de l'API
      setAssignments((current) => [
        ...current,
        ...selectedInterns.map((intern) => ({
          intern,
          supervisor: supervisor.name,
          department: supervisor.department,
        })),
      ])

      setSelectedInterns([])
      setSelectedSupervisor(null)

      alert('Affectation effectuée avec succès.')
    } catch (err) {
      console.error(
        "Erreur lors de l'affectation :",
        err,
      )

      alert(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'affectation",
      )
    }
  }

  return (
    <div className="stage-page">
      {/* ======================================================
          EN-TÊTE
          ====================================================== */}

      <div className="mb-7">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[rgb(var(--intern-blue))]">
          Administration entreprise
        </p>

        <h1 className="stage-heading text-3xl font-extrabold sm:text-[38px]">
          Affectations
        </h1>

        <p className="stage-subtitle mt-2 max-w-2xl">
         
        </p>
      </div>

      {/* ======================================================
          FILTRE DÉPARTEMENTS
          ====================================================== */}

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setDepartment('Tous')
            setSelectedInterns([])
            setSelectedSupervisor(null)
          }}
          className={cn(
            'stage-button rounded-xl border px-4 py-2.5 text-sm font-bold',
            'transition-all duration-200',
            department === 'Tous'
              ? 'border-[rgb(var(--intern-navy))] bg-[rgb(var(--intern-navy))] text-white shadow-[0_8px_20px_rgba(8,43,73,.18)]'
              : 'border-[rgb(var(--intern-navy))]/10 bg-white text-[rgb(var(--intern-navy))] hover:border-[rgb(var(--intern-blue))]/30 hover:bg-[rgb(var(--intern-soft-blue))]',
          )}
        >
          Tous
        </button>

        {departments.map((dept) => (
          <button
            key={dept}
            type="button"
            onClick={() => {
              setDepartment(dept)
              setSelectedInterns([])
              setSelectedSupervisor(null)
            }}
            className={cn(
              'stage-button rounded-xl border px-4 py-2.5 text-sm font-bold',
              'transition-all duration-200',
              department === dept
                ? 'border-[rgb(var(--intern-navy))] bg-[rgb(var(--intern-navy))] text-white shadow-[0_8px_20px_rgba(8,43,73,.18)]'
                : 'border-[rgb(var(--intern-navy))]/10 bg-white text-[rgb(var(--intern-navy))] hover:border-[rgb(var(--intern-blue))]/30 hover:bg-[rgb(var(--intern-soft-blue))]',
            )}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* ======================================================
          AUCUN DÉPARTEMENT SÉLECTIONNÉ
          ====================================================== */}

      {!department ? (
        <Card className="stage-card rounded-[26px] border-dashed p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))] shadow-[0_8px_20px_rgba(8,126,186,.10)]">
            <ArrowRight className="h-6 w-6" />
          </div>

          <p className="mt-4 text-sm font-bold text-[rgb(var(--intern-navy))]">
            Sélectionnez un département
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
           
          </p>
        </Card>
      ) : (
        <>
          {/* ==================================================
              NOUVELLE AFFECTATION
              ================================================== */}

          <Card className="stage-card stage-3d-card mb-6 rounded-[26px] p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="stage-icon-3d flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[rgb(var(--intern-navy))] text-white">
                <ArrowRight className="h-5 w-5" />
              </div>

              <div>
                <h2 className="stage-heading text-xl font-extrabold">
                  {showAll
                    ? 'Tous les départements'
                    : `Département ${department}`}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Nouvelle affectation d'un ou plusieurs stagiaires.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-7 lg:grid-cols-2">
              {/* ==================================================
                  STAGIAIRES
                  ================================================== */}

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-extrabold text-[rgb(var(--intern-navy))]">
                    Stagiaires
                  </p>

                  {selectedInterns.length > 0 && (
                    <Badge className="rounded-full bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))] hover:bg-[rgb(var(--intern-soft-blue))]">
                      {selectedInterns.length} sélectionné
                      {selectedInterns.length > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>

                <div className="max-h-60 space-y-1.5 overflow-y-auto rounded-2xl border border-[rgb(var(--intern-navy))]/10 bg-[rgb(var(--intern-page))] p-2">
                  {deptInterns.length === 0 && (
                    <p className="p-4 text-sm text-muted-foreground">
                      Aucun stagiaire.
                    </p>
                  )}

                  {deptInterns.map((intern) => {
                    const alreadyAssigned =
                      assignedInternNames.includes(intern.name)

                    const selected =
                      selectedInterns.includes(intern.name)

                    return (
                      <button
                        key={intern.name}
                        type="button"
                        disabled={alreadyAssigned}
                        onClick={() => toggleIntern(intern.name)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-bold transition-all',
                          alreadyAssigned
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:-translate-y-[1px] hover:bg-white hover:shadow-sm',
                          selected &&
                            'bg-[rgb(var(--intern-soft-blue))] ring-1 ring-[rgb(var(--intern-blue))]/20',
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-[rgb(var(--intern-navy))]">
                            {intern.name}
                          </span>

                          <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                            {intern.formation}
                            {showAll
                              ? ` · ${intern.department}`
                              : ''}
                          </span>
                        </span>

                        <span className="ml-3 shrink-0">
                          {selected && (
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgb(var(--intern-blue))] text-white shadow-[0_5px_12px_rgba(8,126,186,.22)]">
                              <Check className="h-4 w-4" />
                            </span>
                          )}

                          {alreadyAssigned && (
                            <Badge
                              variant="outline"
                              className="rounded-full text-xs"
                            >
                              Déjà affecté
                            </Badge>
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* ==================================================
                  ENCADRANTS
                  ================================================== */}

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-extrabold text-[rgb(var(--intern-navy))]">
                    Encadrants
                  </p>

                  {selectedSupervisor && (
                    <Badge className="rounded-full bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))] hover:bg-[rgb(var(--intern-soft-blue))]">
                      Sélectionné
                    </Badge>
                  )}
                </div>

                <div className="max-h-60 space-y-1.5 overflow-y-auto rounded-2xl border border-[rgb(var(--intern-navy))]/10 bg-[rgb(var(--intern-page))] p-2">
                  {deptSupervisors.length === 0 && (
                    <p className="p-4 text-sm text-muted-foreground">
                      Aucun encadrant.
                    </p>
                  )}

                  {deptSupervisors.map((sup) => (
                    <button
                      key={sup.id}
                      type="button"
                      onClick={() =>
                        setSelectedSupervisor(sup.id)
                      }
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-all',
                        selectedSupervisor === sup.id
                          ? 'bg-[rgb(var(--intern-soft-blue))] ring-1 ring-[rgb(var(--intern-blue))]/20'
                          : 'hover:-translate-y-[1px] hover:bg-white hover:shadow-sm',
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-[rgb(var(--intern-navy))]">
                          {sup.name}
                        </span>

                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {sup.interns_count} stagiaire
                          {sup.interns_count > 1 ? 's' : ''}
                          {showAll
                            ? ` · ${sup.department}`
                            : ''}
                        </span>
                      </span>

                      {selectedSupervisor === sup.id && (
                        <span className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--intern-blue))] text-white shadow-[0_5px_12px_rgba(8,126,186,.22)]">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ==================================================
                BOUTON AFFECTER
                ================================================== */}

            <div className="mt-7 flex justify-end">
              <Button
                className="stage-button h-11 rounded-xl bg-[rgb(var(--intern-navy))] px-5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(8,43,73,.18)] hover:bg-[rgb(var(--intern-navy-deep))]"
                disabled={
                  selectedInterns.length === 0 ||
                  !selectedSupervisor
                }
                onClick={assign}
              >
                Affecter
                {selectedInterns.length > 1
                  ? ` (${selectedInterns.length} stagiaires)`
                  : ''}

                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* ====================================================
              TABLE DES AFFECTATIONS
              ==================================================== */}

          <Card className="stage-card overflow-hidden rounded-[26px]">
            <div className="border-b border-[rgb(var(--intern-navy))]/[0.06] px-6 py-5">
              <h2 className="stage-heading text-lg font-extrabold">
                Affectations actuelles
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Liste des stagiaires déjà affectés à un encadrant.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-[rgb(var(--intern-page))] text-left text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    <th className="px-6 py-4">
                      Stagiaire
                    </th>

                    <th className="px-6 py-4">
                      Encadrant
                    </th>

                    {showAll && (
                      <th className="px-6 py-4">
                        Département
                      </th>
                    )}

                    <th className="px-6 py-4">
                      Statut
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {assignments
                    .filter(
                      (a) =>
                        showAll ||
                        a.department === department,
                    )
                    .map((a, i) => (
                      <tr
                        key={`${a.intern}-${a.supervisor}-${i}`}
                        className="stage-table-row border-b border-[rgb(var(--intern-navy))]/[0.05] last:border-0"
                      >
                        <td className="px-6 py-4 font-bold text-[rgb(var(--intern-navy))]">
                          {a.intern}
                        </td>

                        <td className="px-6 py-4 text-muted-foreground">
                          {a.supervisor}
                        </td>

                        {showAll && (
                          <td className="px-6 py-4 text-muted-foreground">
                            {a.department}
                          </td>
                        )}

                        <td className="px-6 py-4">
                          <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-100">
                            Actif
                          </Badge>
                        </td>
                      </tr>
                    ))}

                  {assignments.filter(
                    (a) =>
                      showAll ||
                      a.department === department,
                  ).length === 0 && (
                    <tr>
                      <td
                        colSpan={showAll ? 4 : 3}
                        className="px-6 py-10 text-center text-sm text-muted-foreground"
                      >
                        Aucune affectation pour ce département.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}