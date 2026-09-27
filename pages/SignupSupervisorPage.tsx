import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '../lib/shadcn/button'
import { Card } from '../lib/shadcn/card'
import type { SignupDraft } from './data/internPilotData'
import { AuthHeader } from './ui/AuthHeader'
import { StepIndicator } from './ui/StepIndicator'
import { registerSupervisor } from '../services/auth'
import { getApprovedCompaniesPublic, type PublicCompany } from '../services/companies'

type SignupSupervisorPageProps = {
  draft: SignupDraft
  updateDraft: (changes: Partial<SignupDraft>) => void
}

const steps = [
  { number: 1, label: 'Rôle' },
  { number: 2, label: 'Profil' },
  { number: 3, label: 'Entreprise' },
  { number: 4, label: 'Validation' },
]

export default function SignupSupervisorPage({ draft }: SignupSupervisorPageProps) {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [companies, setCompanies] = useState<PublicCompany[]>([])

  useEffect(() => {
    getApprovedCompaniesPublic()
      .then((res) => setCompanies(res.companies))
      .catch(() => {})
  }, [])

  const selectedCompany = companies.find((c) => c.id === draft.selectedCompanyId)

  async function handleSubmit() {
    if (!selectedCompany) return
    setError('')
    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('name', draft.name)
      formData.append('email', draft.email)
      formData.append('phone', draft.phone)
      formData.append('password', draft.password)
      formData.append('confirm_password', draft.confirmPassword)
      formData.append('company_name', selectedCompany.name)
      formData.append('job', draft.job)
      formData.append('department', draft.department)
      formData.append('specialization', draft.specialization)
      if (draft.years_of_experience) {
        formData.append('years_of_experience', draft.years_of_experience)
      }
      if (draft.profil_image) {
        formData.append('profile_image', draft.profil_image)
      }

      await registerSupervisor(formData)
      navigate('/signup/verify-otp')
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'inscription")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen soft-grid-background text-foreground">
      <AuthHeader />
      <section className="mx-auto max-w-[720px] px-6 py-9">
        <StepIndicator steps={steps} currentStep={4} />

        <Card className="mt-7 rounded-3xl p-8 shadow-retool-md sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))] dark:bg-secondary">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Vérifiez votre demande</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Vérifiez vos informations avant d'envoyer votre demande d'inscription en tant qu'encadrant.
          </p>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <p><span className="text-muted-foreground">Nom :</span> <span className="font-semibold text-foreground">{draft.name}</span></p>
            <p><span className="text-muted-foreground">Email :</span> <span className="font-semibold text-foreground">{draft.email}</span></p>
            <p><span className="text-muted-foreground">Entreprise :</span> <span className="font-semibold text-foreground">{selectedCompany?.name ?? '—'}</span></p>
            <p><span className="text-muted-foreground">Poste :</span> <span className="font-semibold text-foreground">{draft.job}</span></p>
            <p><span className="text-muted-foreground">Département :</span> <span className="font-semibold text-foreground">{draft.department}</span></p>
            <p><span className="text-muted-foreground">Spécialisation :</span> <span className="font-semibold text-foreground">{draft.specialization}</span></p>
          </div>

          {error && <p className="mt-6 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

          <div className="mt-8 flex items-center justify-between gap-4">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => navigate('/signup/company')}>
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <Button
              type="button"
              disabled={submitting || !selectedCompany}
              className="rounded-xl bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy-deep))]"
              onClick={handleSubmit}
            >
              {submitting ? 'Envoi en cours...' : 'Envoyer la demande'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </section>
    </main>
  )
}