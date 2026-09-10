import type { FormEvent, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Upload } from 'lucide-react'
import { Button } from '../lib/shadcn/button'
import { Input } from '../lib/shadcn/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../lib/shadcn/select'
import { Textarea } from '../lib/shadcn/textarea'
import { AuthHeader } from './ui/AuthHeader'
import { StepIndicator } from './ui/StepIndicator'
import type { InternType, SignupDraft } from './data/internPilotData'
import { cn } from '../lib/shadcn/utils'

type SignupInformationPageProps = {
  draft: SignupDraft
  updateDraft: (changes: Partial<SignupDraft>) => void
}

const internSteps = [
  { number: 1, label: 'Type de stage' },
  { number: 2, label: 'Informations' },
  { number: 3, label: 'Entreprise' },
  { number: 4, label: 'Encadrant' },
  { number: 5, label: 'Demande' },
]

const supervisorSteps = [
  { number: 1, label: 'Rôle' },
  { number: 2, label: 'Profil' },
  { number: 3, label: 'Entreprise' },
  { number: 4, label: 'Validation' },
]

export default function SignupInformationPage({ draft, updateDraft }: SignupInformationPageProps) {
  const navigate = useNavigate()
  const isSupervisor = draft.role === 'supervisor'

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSupervisor) {
      navigate('/signup/request')
      return
    }
    navigate('/signup/company')
  }

  return (
    <main className="min-h-screen soft-grid-background text-foreground">
      <AuthHeader />
      <section className="mx-auto max-w-[1120px] px-6 py-9">
        <StepIndicator steps={isSupervisor ? supervisorSteps : internSteps} currentStep={2} />

        <form onSubmit={submitForm} className="mt-7 rounded-3xl border bg-card p-8 shadow-retool-md sm:p-10">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
                {isSupervisor ? 'Vos informations — encadrant' : `Vos informations — parcours ${draft.internType}`}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {isSupervisor
                  ? "Ces champs correspondent aux tables users et supervisor, avec l'ID de l'entreprise obligatoire."
                  : 'Ces champs correspondent aux tables users et intern de la base de données fournie.'}
              </p>
            </div>

            {!isSupervisor ? (
              <div className="flex rounded-2xl border bg-background p-1">
                {(['PFE', 'PFC'] as InternType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateDraft({ internType: type })}
                    className={cn(
                      'rounded-xl px-5 py-2 text-sm font-bold transition-colors',
                      draft.internType === type
                        ? 'bg-[rgb(var(--intern-navy))] text-white'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {isSupervisor ? <SupervisorFields /> : <InternFields />}

          <div className="mt-9 flex items-center justify-between gap-4">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => navigate('/signup')}>
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <Button type="submit" className="rounded-xl bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy-deep))]">
              Continuer
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </section>
    </main>
  )
}

function InternFields() {
  return (
    <div className="grid gap-x-4 gap-y-5 md:grid-cols-2">
      <Field label="Nom complet" htmlFor="name">
        <Input id="name" name="name" placeholder="Imane Tazi" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="E-mail" htmlFor="email">
        <Input id="email" name="email" type="email" placeholder="prenom.nom@universite.ma" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="Téléphone" htmlFor="phone">
        <Input id="phone" name="phone" placeholder="+212 6 00 00 00 00" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="Établissement universitaire" htmlFor="establishment">
        <Input id="establishment" name="establishment" placeholder="ENSIAS Rabat" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="Niveau d'études" htmlFor="studies_level">
        <Select defaultValue="bac5" name="studies_level">
          <SelectTrigger id="studies_level" className="h-10 rounded-xl shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bac3">Bac+3 — Licence</SelectItem>
            <SelectItem value="bac5">Bac+5 — Ingénierie / Master</SelectItem>
            <SelectItem value="doctorat">Doctorat</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Secteur du stage" htmlFor="sector">
        <Input id="sector" name="sector" placeholder="Data & IA" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="Date de début" htmlFor="start_date">
        <Input id="start_date" name="start_date" type="date" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="Date de fin" htmlFor="end_date">
        <Input id="end_date" name="end_date" type="date" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="Image de profil (URL)" htmlFor="profil_image">
        <Input id="profil_image" name="profil_image" placeholder="https://..." className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="Mot de passe" htmlFor="password">
        <Input id="password" name="password" type="password" placeholder="••••••••" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="Sujet envisagé du mémoire" htmlFor="memoire" className="md:col-span-2">
        <Textarea
          id="memoire"
          name="memoire"
          placeholder="Détection d'anomalies réseau par apprentissage profond..."
          className="min-h-[78px] rounded-xl shadow-sm"
        />
      </Field>
      <div className="md:col-span-2">
        <p className="mb-2 text-sm font-semibold text-foreground">Convention de stage (PDF ou image)</p>
        <div className="flex min-h-[176px] flex-col items-center justify-center rounded-2xl border border-dashed bg-background/60 p-6 text-center">
          <Upload className="h-6 w-6 text-[rgb(var(--intern-blue))]" />
          <p className="mt-3 font-bold text-[rgb(var(--intern-navy))] dark:text-foreground">Déposez votre convention ici</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Elle sera examinée par l'administration de l'entreprise (statut : en attente de traitement).
          </p>
          <Button type="button" variant="outline" size="sm" className="mt-4 rounded-xl">
            Parcourir les fichiers
          </Button>
        </div>
      </div>
    </div>
  )
}

function SupervisorFields() {
  return (
    <div className="grid gap-x-4 gap-y-5 md:grid-cols-2">
      <Field label="Nom complet" htmlFor="supervisor_name">
        <Input id="supervisor_name" name="name" placeholder="Karim Bennani" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="E-mail professionnel" htmlFor="supervisor_email">
        <Input id="supervisor_email" name="email" type="email" placeholder="nom@entreprise.ma" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="Téléphone" htmlFor="supervisor_phone">
        <Input id="supervisor_phone" name="phone" placeholder="+212 6 00 00 00 00" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="ID de l'entreprise" htmlFor="company_id">
        <div className="relative">
          <BriefcaseBusiness className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--intern-blue))]" />
          <Input id="company_id" name="company_id" type="number" placeholder="Ex. 1" className="h-10 rounded-xl pl-10 shadow-sm" />
        </div>
      </Field>
      <Field label="Poste" htmlFor="job">
        <Input id="job" name="job" placeholder="Architecte réseau senior" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="Département" htmlFor="department">
        <Input id="department" name="department" placeholder="Infrastructure" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="Spécialisation" htmlFor="specialization">
        <Input id="specialization" name="specialization" placeholder="Réseaux & Cloud hybride" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="Années d'expérience" htmlFor="years_of_experience">
        <Input id="years_of_experience" name="years_of_experience" type="number" placeholder="12" className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="Image de profil (URL)" htmlFor="supervisor_image">
        <Input id="supervisor_image" name="profil_image" placeholder="https://..." className="h-10 rounded-xl shadow-sm" />
      </Field>
      <Field label="Mot de passe" htmlFor="supervisor_password">
        <Input id="supervisor_password" name="password" type="password" placeholder="••••••••" className="h-10 rounded-xl shadow-sm" />
      </Field>
    </div>
  )
}

function Field({ children, className, htmlFor, label }: { children: ReactNode; className?: string; htmlFor: string; label: string }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-semibold text-foreground" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  )
}
