import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Search,
} from 'lucide-react'

import { Button } from '../lib/shadcn/button'
import { Card } from '../lib/shadcn/card'
import { Input } from '../lib/shadcn/input'
import { cn } from '../lib/shadcn/utils'
import {
  companies,
  type SignupDraft,
} from './data/internPilotData'
import { AuthHeader } from './ui/AuthHeader'
import { StepIndicator } from './ui/StepIndicator'

type SignupCompanyPageProps = {
  draft: SignupDraft
  updateDraft: (changes: Partial<SignupDraft>) => void
}

const internSteps = [
  { number: 1, label: 'Type de stage' },
  { number: 2, label: 'Informations' },
  { number: 3, label: 'Entreprise' },
  { number: 4, label: 'Validation' },
]

const supervisorSteps = [
  { number: 1, label: 'Rôle' },
  { number: 2, label: 'Profil' },
  { number: 3, label: 'Entreprise' },
  { number: 4, label: 'Validation' },
]

export default function SignupCompanyPage({
  draft,
  updateDraft,
}: SignupCompanyPageProps) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const isSupervisor = draft.role === 'supervisor'

  const filteredCompanies = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return companies
    }

    return companies.filter((company) =>
      `${company.name} ${company.description}`
        .toLowerCase()
        .includes(query),
    )
  }, [searchTerm])

  return (
    <main className="min-h-screen soft-grid-background text-foreground">
      <AuthHeader />

      <section className="mx-auto max-w-[1120px] px-6 py-9">

        {/* Étapes du parcours */}
        <StepIndicator
          steps={
            isSupervisor
              ? supervisorSteps
              : internSteps
          }
          currentStep={3}
        />

        <Card className="mt-7 rounded-3xl p-8 shadow-retool-md sm:p-10">

          {/* Titre */}
          <h1 className="text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
            {isSupervisor
              ? 'Sélectionnez votre entreprise'
              : 'Choisissez votre entreprise'}
          </h1>

          {/* Description */}
          <p className="mt-2 text-sm text-muted-foreground">
            {isSupervisor
              ? "Sélectionnez l'entreprise à laquelle vous êtes rattaché."
              : "Sélectionnez l'entreprise dans laquelle vous souhaitez effectuer votre stage."}
          </p>

          {/* Recherche */}
          <div className="relative mt-5">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Rechercher une entreprise"
              className="h-12 rounded-2xl pl-11 shadow-sm"
            />
          </div>

          {/* Liste des entreprises */}
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {filteredCompanies.map((company) => {
              const selected =
                draft.selectedCompanyId === company.id

              return (
                <button
                  key={company.id}
                  type="button"
                  onClick={() =>
                    updateDraft({
                      selectedCompanyId: company.id,
                    })
                  }
                  className="text-left"
                >
                  <div
                    className={cn(
                      'flex min-h-[102px] items-start gap-4 rounded-2xl border bg-card p-4 text-left transition-all hover:border-[rgb(var(--intern-blue))] hover:shadow-retool-sm',

                      selected &&
                        'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))] shadow-retool-sm',
                    )}
                  >
                    {/* Icône entreprise */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--intern-navy))] text-white">
                      <Building2 className="h-5 w-5" />
                    </div>

                    {/* Informations entreprise */}
                    <div>
                      <p className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
                        {company.name}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {company.description}
                      </p>

                      <p className="mt-4 text-xs text-muted-foreground">
                        {company.supervisors_count} encadrants ·{' '}
                        {company.interns_count} stagiaires
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Aucun résultat */}
          {filteredCompanies.length === 0 && (
            <div className="mt-5 rounded-2xl border border-dashed p-8 text-center">
              <Building2 className="mx-auto h-8 w-8 text-muted-foreground" />

              <p className="mt-3 font-semibold">
                Aucune entreprise trouvée
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Essayez avec un autre nom d'entreprise.
              </p>
            </div>
          )}

          {/* Entreprise sélectionnée */}
          {draft.selectedCompanyId && (
            <div className="mt-5 rounded-2xl border border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Entreprise sélectionnée
              </p>

              <p className="mt-1 font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
                {
                  companies.find(
                    (company) =>
                      company.id === draft.selectedCompanyId,
                  )?.name
                }
              </p>
            </div>
          )}

          {/* Boutons */}
          <div className="mt-8 flex items-center justify-between gap-4">

            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={() =>
                navigate('/signup/information')
              }
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>

            <Button
              type="button"
              disabled={!draft.selectedCompanyId}
              className="rounded-xl bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy-deep))]"
              onClick={() =>
                navigate('/signup/request')
              }
            >
              Continuer
              <ArrowRight className="h-4 w-4" />
            </Button>

          </div>

        </Card>
      </section>
    </main>
  )
}