import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
 
  Camera,
  CheckCircle2,
  FileText,
  Upload,
  X,
} from 'lucide-react'

import { Button } from '../lib/shadcn/button'
import { Input } from '../lib/shadcn/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../lib/shadcn/select'
import { Textarea } from '../lib/shadcn/textarea'
import { AuthHeader } from './ui/AuthHeader'
import { StepIndicator } from './ui/StepIndicator'
import type { InternType, SignupDraft } from './data/internPilotData'
import { cn } from '../lib/shadcn/utils'

type SignupInformationPageProps = {
  draft: SignupDraft
  updateDraft: (changes: Partial<SignupDraft>) => void
}

type Errors = Record<string, string>

const internSteps = [
  { number: 1, label: 'Type de stage' },
  { number: 2, label: 'Informations' },
  { number: 3, label: 'Entreprise' },
  
  { number: 4, label: 'Demande' },
]

const supervisorSteps = [
  { number: 1, label: 'Rôle' },
  { number: 2, label: 'Profil' },
  { number: 3, label: 'Entreprise' },
  { number: 4, label: 'Validation' },
]

export default function SignupInformationPage({
  draft,
  updateDraft,
}: SignupInformationPageProps) {
  const navigate = useNavigate()
  const isSupervisor = draft.role === 'supervisor'

  const [errors, setErrors] = useState<Errors>({})

  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [conventionName, setConventionName] = useState<string>('')

  useEffect(() => {
    if (draft.profil_image) {
      const url = URL.createObjectURL(draft.profil_image)
      setProfilePreview(url)

      return () => {
        URL.revokeObjectURL(url)
      }
    }

    setProfilePreview(null)
  }, [draft.profil_image])

  useEffect(() => {
    if (draft.convention_file) {
      setConventionName(draft.convention_file.name)
    } else {
      setConventionName('')
    }
  }, [draft.convention_file])

  function validateIntern(): Errors {
    const newErrors: Errors = {}

    if (!draft.name.trim()) {
      newErrors.name = 'Le nom complet est obligatoire.'
    }

    if (!draft.email.trim()) {
      newErrors.email = "L'e-mail est obligatoire."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) {
      newErrors.email = "L'e-mail n'est pas valide."
    }

    if (!draft.phone.trim()) {
      newErrors.phone = 'Le téléphone est obligatoire.'
    }

    if (!draft.establishment.trim()) {
      newErrors.establishment = "L'établissement universitaire est obligatoire."
    }

    if (!draft.studies_level.trim()) {
      newErrors.studies_level = 'Le niveau d’études est obligatoire.'
    }

    if (!draft.sector.trim()) {
      newErrors.sector = 'Le secteur du stage est obligatoire.'
    }

    if (!draft.start_date) {
      newErrors.start_date = 'La date de début est obligatoire.'
    }

    if (!draft.end_date) {
      newErrors.end_date = 'La date de fin est obligatoire.'
    }

    if (draft.start_date && draft.end_date) {
      if (new Date(draft.end_date) <= new Date(draft.start_date)) {
        newErrors.end_date =
          'La date de fin doit être après la date de début.'
      }
    }

    if (!draft.profil_image) {
      newErrors.profil_image = 'La photo de profil est obligatoire.'
    }

    if (!draft.password.trim()) {
      newErrors.password = 'Le mot de passe est obligatoire.'
    } else if (draft.password.length < 8) {
      newErrors.password =
        'Le mot de passe doit contenir au moins 8 caractères.'
    }

    if (!draft.memoire.trim()) {
      newErrors.memoire = 'Le sujet du mémoire est obligatoire.'
    }

    if (!draft.convention_file) {
      newErrors.convention_file =
        'La convention de stage est obligatoire.'
    }

    return newErrors
  }

  function validateSupervisor(): Errors {
  const newErrors: Errors = {}

  if (!draft.supervisor_id.trim()) {
    newErrors.supervisor_id =
      "L'ID de l'encadrant est obligatoire."
  }

  if (!draft.name.trim()) {
    newErrors.name =
      'Le nom complet est obligatoire.'
  }

  if (!draft.email.trim()) {
    newErrors.email =
      "L'e-mail professionnel est obligatoire."
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)
  ) {
    newErrors.email =
      "L'e-mail n'est pas valide."
  }

  if (!draft.phone.trim()) {
    newErrors.phone =
      'Le téléphone est obligatoire.'
  }

  if (!draft.job.trim()) {
    newErrors.job =
      'Le poste est obligatoire.'
  }

  if (!draft.department.trim()) {
    newErrors.department =
      'Le département est obligatoire.'
  }

  if (!draft.specialization.trim()) {
    newErrors.specialization =
      'La spécialisation est obligatoire.'
  }

  if (!draft.years_of_experience.trim()) {
    newErrors.years_of_experience =
      "Le nombre d'années d'expérience est obligatoire."
  } else if (Number(draft.years_of_experience) < 0) {
    newErrors.years_of_experience =
      "Le nombre d'années d'expérience n'est pas valide."
  }

  if (!draft.profil_image) {
    newErrors.profil_image =
      'La photo de profil est obligatoire.'
  }

  if (!draft.password.trim()) {
    newErrors.password =
      'Le mot de passe est obligatoire.'
  } else if (draft.password.length < 8) {
    newErrors.password =
      'Le mot de passe doit contenir au moins 8 caractères.'
  }

  return newErrors
}

  function submitForm(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const validationErrors = isSupervisor
    ? validateSupervisor()
    : validateIntern()

  setErrors(validationErrors)

  if (Object.keys(validationErrors).length > 0) {
    return
  }

  navigate(isSupervisor ? '/signup/request' : '/signup/company')
}
  function clearError(field: string) {
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
  }

  function handleProfileImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      setErrors((current) => ({
        ...current,
        profil_image: 'Veuillez sélectionner une image valide.',
      }))
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        profil_image: "L'image ne doit pas dépasser 5 Mo.",
      }))
      return
    }

    updateDraft({ profil_image: file })
    clearError('profil_image')
  }

  function removeProfileImage() {
    updateDraft({ profil_image: null })
  }

  function handleConvention(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const isPdf = file.type === 'application/pdf'
    const isImage = file.type.startsWith('image/')

    if (!isPdf && !isImage) {
      setErrors((current) => ({
        ...current,
        convention_file:
          'Veuillez sélectionner un fichier PDF ou une image.',
      }))
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        convention_file:
          'La convention ne doit pas dépasser 10 Mo.',
      }))
      return
    }

    updateDraft({ convention_file: file })
    clearError('convention_file')
  }

  function removeConvention() {
    updateDraft({ convention_file: null })
  }

  return (
    <main className="min-h-screen soft-grid-background text-foreground">
      <AuthHeader />

      <section className="mx-auto max-w-[1120px] px-6 py-9">
        <StepIndicator
          steps={isSupervisor ? supervisorSteps : internSteps}
          currentStep={2}
        />

        <form
          onSubmit={submitForm}
          className="mt-7 rounded-3xl border bg-card p-8 shadow-retool-md sm:p-10"
          noValidate
        >
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
                {isSupervisor
                  ? 'Vos informations — encadrant'
                  : `Vos informations — parcours ${draft.internType}`}
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                {isSupervisor
                  ? "Complétez votre profil d'encadrant."
                  : 'Complétez toutes les informations nécessaires à votre inscription.'}
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

          {isSupervisor ? (
            <SupervisorFields
              draft={draft}
              errors={errors}
              onChange={updateDraft}
              onClearError={clearError}
              onProfileImage={handleProfileImage}
              onRemoveProfileImage={removeProfileImage}
              profilePreview={profilePreview}
            />
          ) : (
            <InternFields
              draft={draft}
              errors={errors}
              onChange={updateDraft}
              onClearError={clearError}
              onProfileImage={handleProfileImage}
              onRemoveProfileImage={removeProfileImage}
              profilePreview={profilePreview}
              conventionName={conventionName}
              onConvention={handleConvention}
              onRemoveConvention={removeConvention}
            />
          )}

          {Object.keys(errors).length > 0 && (
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <X className="mt-0.5 h-5 w-5 shrink-0" />

              <div>
                <p className="font-bold">
                  Veuillez corriger les champs obligatoires.
                </p>
                <p className="mt-1">
                  Vous ne pouvez pas continuer tant que les erreurs ne sont
                  pas corrigées.
                </p>
              </div>
            </div>
          )}

          <div className="mt-9 flex items-center justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={() => navigate('/signup')}
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>

            <Button
              type="submit"
              className="rounded-xl bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy-deep))]"
            >
              Continuer
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </section>
    </main>
  )
}

type FieldsProps = {
  draft: SignupDraft
  errors: Errors
  onChange: (changes: Partial<SignupDraft>) => void
  onClearError: (field: string) => void
  onProfileImage: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveProfileImage: () => void
  profilePreview: string | null
}

function InternFields({
  draft,
  errors,
  onChange,
  onClearError,
  onProfileImage,
  onRemoveProfileImage,
  profilePreview,
  conventionName,
  onConvention,
  onRemoveConvention,
}: FieldsProps & {
  conventionName: string
  onConvention: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveConvention: () => void
}) {
  return (
    <div className="grid gap-x-4 gap-y-5 md:grid-cols-2">
      <Field label="Nom complet" htmlFor="name" error={errors.name}>
        <Input
          id="name"
          value={draft.name}
          onChange={(e) => {
            onChange({ name: e.target.value })
            onClearError('name')
          }}
          placeholder="Imane Tazi"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <Field label="E-mail" htmlFor="email" error={errors.email}>
        <Input
          id="email"
          type="email"
          value={draft.email}
          onChange={(e) => {
            onChange({ email: e.target.value })
            onClearError('email')
          }}
          placeholder="prenom.nom@universite.ma"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <Field label="Téléphone" htmlFor="phone" error={errors.phone}>
        <Input
          id="phone"
          value={draft.phone}
          onChange={(e) => {
            onChange({ phone: e.target.value })
            onClearError('phone')
          }}
          placeholder="+213 5 00 00 00 00"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <Field
        label="Établissement universitaire"
        htmlFor="establishment"
        error={errors.establishment}
      >
        <Input
          id="establishment"
          value={draft.establishment}
          onChange={(e) => {
            onChange({ establishment: e.target.value })
            onClearError('establishment')
          }}
          placeholder="USTHB"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <Field
        label="Niveau d'études"
        htmlFor="studies_level"
        error={errors.studies_level}
      >
        <Select
          value={draft.studies_level}
          onValueChange={(value) => {
            onChange({ studies_level: value })
            onClearError('studies_level')
          }}
        >
          <SelectTrigger
            id="studies_level"
            className="h-10 rounded-xl shadow-sm"
          >
            <SelectValue placeholder="Choisir un niveau" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="bac3">
              Bac+3 — Licence
            </SelectItem>
            <SelectItem value="bac5">
              Bac+5 — Ingénierie / Master
            </SelectItem>
            <SelectItem value="doctorat">
              Doctorat
            </SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field
        label="Secteur du stage"
        htmlFor="sector"
        error={errors.sector}
      >
        <Input
          id="sector"
          value={draft.sector}
          onChange={(e) => {
            onChange({ sector: e.target.value })
            onClearError('sector')
          }}
          placeholder="Data & IA"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>
      <Field
        label="Mot de passe"
        htmlFor="password"
        error={errors.password}
      >
        <Input
          id="password"
          type="password"
          value={draft.password}
          onChange={(e) => {
            onChange({ password: e.target.value })
            onClearError('password')
          }}
          placeholder="••••••••"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <Field
        label="Date de début"
        htmlFor="start_date"
        error={errors.start_date}
      >
        <Input
          id="start_date"
          type="date"
          value={draft.start_date}
          onChange={(e) => {
            onChange({ start_date: e.target.value })
            onClearError('start_date')
            onClearError('end_date')
          }}
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <Field
        label="Date de fin"
        htmlFor="end_date"
        error={errors.end_date}
      >
        <Input
          id="end_date"
          type="date"
          value={draft.end_date}
          onChange={(e) => {
            onChange({ end_date: e.target.value })
            onClearError('end_date')
          }}
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <ProfileImageField
        error={errors.profil_image}
        preview={profilePreview}
        fileName={draft.profil_image?.name}
        onChange={onProfileImage}
        onRemove={onRemoveProfileImage}
      />

      <Field
        label="Mot de passe"
        htmlFor="password"
        error={errors.password}
      >
        <Input
          id="password"
          type="password"
          value={draft.password}
          onChange={(e) => {
            onChange({ password: e.target.value })
            onClearError('password')
          }}
          placeholder="••••••••"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <Field
        label="Sujet envisagé du mémoire"
        htmlFor="memoire"
        error={errors.memoire}
        className="md:col-span-2"
      >
        <Textarea
          id="memoire"
          value={draft.memoire}
          onChange={(e) => {
            onChange({ memoire: e.target.value })
            onClearError('memoire')
          }}
          placeholder="Détection d'anomalies réseau par apprentissage profond..."
          className="min-h-[100px] rounded-xl shadow-sm"
        />
      </Field>

      <ConventionField
        error={errors.convention_file}
        fileName={conventionName}
        onChange={onConvention}
        onRemove={onRemoveConvention}
      />
    </div>
  )
}

function SupervisorFields({
  draft,
  errors,
  onChange,
  onClearError,
  onProfileImage,
  onRemoveProfileImage,
  profilePreview,
}: FieldsProps) {
  return (
    <div className="grid gap-x-4 gap-y-5 md:grid-cols-2">
      <Field
        label="Nom complet"
        htmlFor="supervisor_name"
        error={errors.name}
      >
        <Input
          id="supervisor_name"
          value={draft.name}
          onChange={(e) => {
            onChange({ name: e.target.value })
            onClearError('name')
          }}
          placeholder="Karim Bennani"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <Field
        label="E-mail professionnel"
        htmlFor="supervisor_email"
        error={errors.email}
      >
        <Input
          id="supervisor_email"
          type="email"
          value={draft.email}
          onChange={(e) => {
            onChange({ email: e.target.value })
            onClearError('email')
          }}
          placeholder="nom@entreprise.com"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <Field
        label="Téléphone"
        htmlFor="supervisor_phone"
        error={errors.phone}
      >
        <Input
          id="supervisor_phone"
          value={draft.phone}
          onChange={(e) => {
            onChange({ phone: e.target.value })
            onClearError('phone')
          }}
          placeholder="+213 5 00 00 00 00"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

    <Field
  label="ID de l'encadrant"
  htmlFor="supervisor_id"
  error={errors.supervisor_id}
>
  <Input
    id="supervisor_id"
    name="supervisor_id"
    type="text"
    value={draft.supervisor_id}
    onChange={(event) => {
      onChange({
        supervisor_id: event.target.value,
      })
      onClearError('supervisor_id')
    }}
    placeholder="Ex. ENC-001"
    className="h-10 rounded-xl shadow-sm"
    autoComplete="off"
  />
</Field>
<Field
        label="Mot de passe"
        htmlFor="supervisor_password"
        error={errors.password}
      >
        <Input
          id="supervisor_password"
          type="password"
          value={draft.password}
          onChange={(e) => {
            onChange({ password: e.target.value })
            onClearError('password')
          }}
          placeholder="••••••••"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <Field label="Poste" htmlFor="job" error={errors.job}>
        <Input
          id="job"
          value={draft.job}
          onChange={(e) => {
            onChange({ job: e.target.value })
            onClearError('job')
          }}
          placeholder="Architecte réseau senior"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <Field
        label="Département"
        htmlFor="department"
        error={errors.department}
      >
        <Input
          id="department"
          value={draft.department}
          onChange={(e) => {
            onChange({ department: e.target.value })
            onClearError('department')
          }}
          placeholder="Infrastructure"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <Field
        label="Spécialisation"
        htmlFor="specialization"
        error={errors.specialization}
      >
        <Input
          id="specialization"
          value={draft.specialization}
          onChange={(e) => {
            onChange({ specialization: e.target.value })
            onClearError('specialization')
          }}
          placeholder="Réseaux & Cloud hybride"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <Field
        label="Années d'expérience"
        htmlFor="years_of_experience"
        error={errors.years_of_experience}
      >
        <Input
          id="years_of_experience"
          type="number"
          min="0"
          value={draft.years_of_experience}
          onChange={(e) => {
            onChange({ years_of_experience: e.target.value })
            onClearError('years_of_experience')
          }}
          placeholder="12"
          className="h-10 rounded-xl shadow-sm"
        />
      </Field>

      <ProfileImageField
        error={errors.profil_image}
        preview={profilePreview}
        fileName={draft.profil_image?.name}
        onChange={onProfileImage}
        onRemove={onRemoveProfileImage}
      />

      
    </div>
  )
}

function ProfileImageField({
  error,
  preview,
  fileName,
  onChange,
  onRemove,
}: {
  error?: string
  preview: string | null
  fileName?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
}) {
  return (
    <div className="md:col-span-2">
      <p className="mb-2 text-sm font-semibold text-foreground">
        Photo de profil <span className="text-red-500">*</span>
      </p>

      <div
        className={cn(
          'rounded-2xl border border-dashed bg-background/60 p-6',
          error && 'border-red-400',
        )}
      >
        <div className="flex flex-col items-center justify-center text-center">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Aperçu de la photo de profil"
                className="h-28 w-28 rounded-full object-cover ring-4 ring-[rgb(var(--intern-soft-blue))]"
              />

              <button
                type="button"
                onClick={onRemove}
                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow"
                aria-label="Supprimer la photo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[rgb(var(--intern-soft-blue))]">
              <Camera className="h-8 w-8 text-[rgb(var(--intern-blue))]" />
            </div>
          )}

          <p className="mt-4 font-bold text-[rgb(var(--intern-navy))] dark:text-foreground">
            {preview ? 'Photo sélectionnée' : 'Photo du profil'}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {fileName || 'PNG, JPG ou WEBP — 5 Mo maximum'}
          </p>

          <label
            htmlFor="profil_image"
            className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border bg-background px-4 py-2 text-sm font-bold transition-colors hover:bg-muted"
          >
            <Camera className="h-4 w-4" />
            {preview ? 'Changer la photo' : 'Choisir une image'}
          </label>

          <input
            id="profil_image"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onChange}
          />
        </div>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
}

function ConventionField({
  error,
  fileName,
  onChange,
  onRemove,
}: {
  error?: string
  fileName: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
}) {
  return (
    <div className="md:col-span-2">
      <p className="mb-2 text-sm font-semibold text-foreground">
        Convention de stage <span className="text-red-500">*</span>
      </p>

      <div
        className={cn(
          'flex min-h-[176px] flex-col items-center justify-center rounded-2xl border border-dashed bg-background/60 p-6 text-center',
          error && 'border-red-400',
        )}
      >
        {fileName ? (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgb(var(--intern-soft-blue))]">
              <FileText className="h-6 w-6 text-[rgb(var(--intern-blue))]" />
            </div>

            <p className="mt-3 max-w-full truncate font-bold text-[rgb(var(--intern-navy))] dark:text-foreground">
              {fileName}
            </p>

            <div className="mt-4 flex gap-2">
              <label
                htmlFor="convention_file"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border bg-background px-4 py-2 text-sm font-bold hover:bg-muted"
              >
                <Upload className="h-4 w-4" />
                Remplacer
              </label>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={onRemove}
              >
                Supprimer
              </Button>
            </div>
          </>
        ) : (
          <>
            <Upload className="h-6 w-6 text-[rgb(var(--intern-blue))]" />

            <p className="mt-3 font-bold text-[rgb(var(--intern-navy))] dark:text-foreground">
              Déposez votre convention ici
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              PDF ou image — 10 Mo maximum
            </p>

            <label
              htmlFor="convention_file"
              className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border bg-background px-4 py-2 text-sm font-bold hover:bg-muted"
            >
              <Upload className="h-4 w-4" />
              Parcourir les fichiers
            </label>
          </>
        )}

        <input
          id="convention_file"
          type="file"
          accept=".pdf,image/*"
          className="sr-only"
          onChange={onChange}
        />
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
}

function Field({
  children,
  className,
  htmlFor,
  label,
  error,
}: {
  children: ReactNode
  className?: string
  htmlFor: string
  label: string
  error?: string
}) {
  return (
    <div className={className}>
      <label
        className="mb-2 block text-sm font-semibold text-foreground"
        htmlFor={htmlFor}
      >
        {label} <span className="text-red-500">*</span>
      </label>

      {children}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
}

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-600">
      <X className="h-3.5 w-3.5" />
      {children}
    </p>
  )
}