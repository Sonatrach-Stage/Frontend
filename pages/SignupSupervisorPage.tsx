import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '../lib/shadcn/button'
import { Card } from '../lib/shadcn/card'
import { cn } from '../lib/shadcn/utils'
import { supervisors, type SignupDraft } from './data/internPilotData'
import { AuthHeader } from './ui/AuthHeader'
import { StepIndicator } from './ui/StepIndicator'

type SignupSupervisorPageProps = {
  draft: SignupDraft
  updateDraft: (changes: Partial<SignupDraft>) => void
}

const steps = [
  { number: 1, label: 'Type de stage' },
  { number: 2, label: 'Informations' },
  { number: 3, label: 'Entreprise' },
  
  { number: 5, label: 'Demande' },
]

export default function SignupSupervisorPage({ draft, updateDraft }: SignupSupervisorPageProps) {
  const navigate = useNavigate()
  const availableSupervisors = useMemo(
    () => supervisors.filter((supervisor) => supervisor.company_id === (draft.selectedCompanyId ?? 1)),
    [draft.selectedCompanyId],
  )

  return (
    <main className="min-h-screen soft-grid-background text-foreground">
      <AuthHeader />
      <section className="mx-auto max-w-[1120px] px-6 py-9">
        <StepIndicator steps={steps} currentStep={4} />

        <Card className="mt-7 rounded-3xl p-8 shadow-retool-md sm:p-10">
          <h1 className="text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Choisissez un encadrant</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Consultez les profils des encadrants de l'entreprise sélectionnée avant de faire votre choix.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {availableSupervisors.map((supervisor) => {
              const selected = draft.selectedSupervisorId === supervisor.id
              const initials = supervisor.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)
              return (
                <button key={supervisor.id} type="button" onClick={() => updateDraft({ selectedSupervisorId: supervisor.id })}>
                  <div
                    className={cn(
                      'flex min-h-[132px] items-start gap-4 rounded-2xl border bg-card p-4 text-left transition-all hover:border-[rgb(var(--intern-blue))] hover:shadow-retool-sm',
                      selected && 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))] shadow-retool-sm',
                    )}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--intern-soft-blue))] font-bold text-[rgb(var(--intern-navy))]">
                      {initials}
                    </div>
                    <div>
                      <p className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{supervisor.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{supervisor.job}</p>
                      <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                        <p>Département : {supervisor.department}</p>
                        <p>Spécialisation : {supervisor.specialization}</p>
                        <p>
                          {supervisor.years_of_experience} ans d'expérience · {supervisor.interns_count} stagiaires
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => navigate('/signup/company')}>
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <Button
              type="button"
              disabled={!draft.selectedSupervisorId}
              className="rounded-xl bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy-deep))]"
              onClick={() => navigate('/signup/request')}
            >
              Envoyer la demande
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </section>
    </main>
  )
}