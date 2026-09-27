import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Building2, Search } from 'lucide-react'

import { Button } from '../lib/shadcn/button'
import { Card } from '../lib/shadcn/card'
import { Input } from '../lib/shadcn/input'
import { cn } from '../lib/shadcn/utils'
import type { SignupDraft } from './data/internPilotData'
import { AuthHeader } from './ui/AuthHeader'
import { StepIndicator } from './ui/StepIndicator'
import { registerIntern } from '../services/auth'
import { getApprovedCompaniesPublic, type PublicCompany } from '../services/companies'

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

function mapInternType(type: 'PFE' | 'PFC') {
  return type === 'PFE' ? 'intern_PFE' : 'intern_PFC'
}

export default function SignupCompanyPage({ draft, updateDraft }: SignupCompanyPageProps) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [companies, setCompanies] = useState<PublicCompany[]>([])
  const [loadingCompanies, setLoadingCompanies] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')

  const isSupervisor = draft.role === 'supervisor'

  useEffect(() => {
    getApprovedCompaniesPublic()
      .then((res) => setCompanies(res.companies))
      .catch((err) => setLoadError(err instanceof Error ? err.message : 'Erreur de chargement des entreprises'))
      .finally(() => setLoadingCompanies(false))
  }, [])

  const filteredCompanies = companies.filter((c) => c.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))

  const selectedCompany = companies.find((c) => c.id === draft.selectedCompanyId)

  async function handleContinue() {
    if (!selectedCompany) return

    if (isSupervisor) {
      navigate('/signup/supervisor')
      return
    }

    setApiError('')
    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('name', draft.name)
      formData.append('email', draft.email)
      formData.append('phone', draft.phone)
      formData.append('password', draft.password)
      formData.append('confirm_password', draft.confirmPassword)
      formData.append('establishment', draft.establishment)
      formData.append('studies_level', draft.studies_level)
      formData.append('sector', draft.sector)
      formData.append('company_name', selectedCompany.name)
      formData.append('intern_type', mapInternType(draft.internType))
      formData.append('start_date', draft.start_date)
      formData.append('end_date', draft.end_date)

      if (draft.internType === 'PFE') {
        formData.append('thesis_subject', draft.memoire)
      }
      if (draft.profil_image) {
        formData.append('profile_image', draft.profil_image)
      }
      if (draft.convention_file) {
        formData.append('convention', draft.convention_file)
      }

      await registerIntern(formData)
      navigate('/signup/verify-otp')
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Erreur lors de l'inscription")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen soft-grid-background text-foreground">
      <AuthHeader />
      <section className="mx-auto max-w-[1120px] px-6 py-9">
        <StepIndicator steps={isSupervisor ? supervisorSteps : internSteps} currentStep={3} />

        <Card className="mt-7 rounded-3xl p-8 shadow-retool-md sm:p-10">
          <h1 className="text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
            {isSupervisor ? 'Sélectionnez votre entreprise' : 'Choisissez votre entreprise'}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSupervisor
              ? "Sélectionnez l'entreprise à laquelle vous êtes rattaché."
              : "Sélectionnez l'entreprise dans laquelle vous souhaitez effectuer votre stage."}
          </p>

          <div className="relative mt-5">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Rechercher une entreprise"
              className="h-12 rounded-2xl pl-11 shadow-sm"
            />
          </div>

          {loadingCompanies && <p className="mt-5 text-sm text-muted-foreground">Chargement des entreprises...</p>}
          {loadError && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{loadError}</p>}

          {!loadingCompanies && !loadError && (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {filteredCompanies.map((company) => {
                const selected = draft.selectedCompanyId === company.id
                return (
                  <button key={company.id} type="button" onClick={() => updateDraft({ selectedCompanyId: company.id })} className="text-left">
                    <div
                      className={cn(
                        'flex min-h-[80px] items-center gap-4 rounded-2xl border bg-card p-4 text-left transition-all hover:border-[rgb(var(--intern-blue))] hover:shadow-retool-sm',
                        selected && 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))] shadow-retool-sm',
                      )}
                    >
                      {company.logo ? (
                        <img src={company.logo} alt={company.name} className="h-10 w-10 rounded-xl object-cover" />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--intern-navy))] text-white">
                          <Building2 className="h-5 w-5" />
                        </div>
                      )}
                      <p className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{company.name}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {!loadingCompanies && !loadError && filteredCompanies.length === 0 && (
            <div className="mt-5 rounded-2xl border border-dashed p-8 text-center">
              <Building2 className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 font-semibold">Aucune entreprise trouvée</p>
            </div>
          )}

          {selectedCompany && (
            <div className="mt-5 rounded-2xl border border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Entreprise sélectionnée</p>
              <p className="mt-1 font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{selectedCompany.name}</p>
            </div>
          )}

          {apiError && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{apiError}</p>}

          <div className="mt-8 flex items-center justify-between gap-4">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => navigate('/signup/information')}>
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <Button
              type="button"
              disabled={!draft.selectedCompanyId || submitting}
              className="rounded-xl bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy-deep))]"
              onClick={handleContinue}
            >
              {submitting ? 'Envoi en cours...' : 'Continuer'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </section>
    </main>
  )
}