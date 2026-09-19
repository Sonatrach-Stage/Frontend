import { useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Building2, Image, ShieldCheck, Upload } from 'lucide-react'

import { Button } from '../lib/shadcn/button'
import { Card } from '../lib/shadcn/card'
import { Input } from '../lib/shadcn/input'
import { Textarea } from '../lib/shadcn/textarea'
import { AuthHeader } from './ui/AuthHeader'
import { registerCompanyAdmin } from '../api/auth'
import type { SignupDraft } from './data/internPilotData'

type AdminSignupPageProps = {
  draft: SignupDraft
  updateDraft: (changes: Partial<SignupDraft>) => void
}

export default function AdminSignupPage({ draft, updateDraft }: AdminSignupPageProps) {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [companyName, setCompanyName] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [companyPhone, setCompanyPhone] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [companySector, setCompanySector] = useState('')
  const [companyDescription, setCompanyDescription] = useState('')
  const [companyWebsite, setCompanyWebsite] = useState('')
  const [registrationNumber, setRegistrationNumber] = useState('')

  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profilePreview, setProfilePreview] = useState<string>('')
  const [companyLogo, setCompanyLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>('')

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleProfileImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image pour la photo de profil.')
      return
    }
    setProfileImage(file)
    setProfilePreview(URL.createObjectURL(file))
  }

  function handleCompanyLogo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image pour le logo.')
      return
    }
    setCompanyLogo(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    if (!profileImage) {
      setError('La photo de profil est obligatoire.')
      return
    }
    if (!companyLogo) {
      setError("Le logo de l'entreprise est obligatoire.")
      return
    }

    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('phone', phone)
      formData.append('password', password)
      formData.append('confirm_password', confirmPassword)
      formData.append('company_name', companyName)
      formData.append('company_address', companyAddress)
      formData.append('company_phone', companyPhone)
      formData.append('company_email', companyEmail)
      formData.append('company_sector', companySector)
      formData.append('company_description', companyDescription)
      formData.append('company_website_URL', companyWebsite)
      formData.append('company_registration_number', registrationNumber)
      formData.append('profile_image', profileImage)
      formData.append('logo', companyLogo)

      await registerCompanyAdmin(formData)

      updateDraft({ role: 'company-admin', email, name })
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

      <section className="mx-auto max-w-[1120px] px-6 py-10">
        <div className="mb-6">
          <h1 className="text-4xl font-black tracking-tight text-[rgb(var(--intern-navy))] dark:text-foreground">
            Inscription administrateur d'entreprise
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
           
          </p>
        </div>

        <form onSubmit={submitForm}>
          <Card className="rounded-3xl p-8 shadow-retool-md sm:p-10">
            <SectionTitle icon={ShieldCheck} title="Compte administrateur" />

            <div className="mt-5 grid gap-x-4 gap-y-5 md:grid-cols-2">
              <Field label="Nom complet" htmlFor="name">
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Amina El Mansouri" className="h-10 rounded-xl shadow-sm" required />
              </Field>

              <Field label="E-mail professionnel" htmlFor="email">
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@entreprise.com" className="h-10 rounded-xl shadow-sm" required />
              </Field>

              <Field label="Téléphone" htmlFor="phone">
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+213 5 XX XX XX XX" className="h-10 rounded-xl shadow-sm" required />
              </Field>

              <Field label="Mot de passe" htmlFor="password">
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-10 rounded-xl shadow-sm" required />
              </Field>

              <Field label="Confirmer le mot de passe" htmlFor="confirm_password">
                <Input id="confirm_password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="h-10 rounded-xl shadow-sm" required />
              </Field>

              <Field label="Photo de profil" htmlFor="admin_profile_image">
                <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4">
                  <label htmlFor="admin_profile_image" className="flex cursor-pointer items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))]">
                      {profilePreview ? <img src={profilePreview} alt="Aperçu du profil" className="h-full w-full object-cover" /> : <Image className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">{profileImage ? profileImage.name : 'Choisir une image'}</p>
                      <p className="mt-1 text-xs text-muted-foreground">PNG, JPG ou WEBP</p>
                    </div>
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </label>
                  <input id="admin_profile_image" type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleProfileImage} />
                </div>
              </Field>
            </div>

            <div className="my-9 h-px bg-border" />

            <SectionTitle icon={Building2} title="Entreprise" />

            <div className="mt-5 grid gap-x-4 gap-y-5 md:grid-cols-2">
              <Field label="Nom de l'entreprise" htmlFor="company_name">
                <Input id="company_name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Atlas Telecom" className="h-10 rounded-xl shadow-sm" required />
              </Field>

              <Field label="Secteur" htmlFor="company_sector">
                <Input id="company_sector" value={companySector} onChange={(e) => setCompanySector(e.target.value)} placeholder="Télécommunications" className="h-10 rounded-xl shadow-sm" required />
              </Field>

              <Field label="Adresse" htmlFor="company_address">
                <Input id="company_address" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} placeholder="Bab Ezzouar, Alger" className="h-10 rounded-xl shadow-sm" required />
              </Field>

              <Field label="Logo de l'entreprise" htmlFor="company_logo">
                <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4">
                  <label htmlFor="company_logo" className="flex cursor-pointer items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[rgb(var(--intern-navy))] text-white">
                      {logoPreview ? <img src={logoPreview} alt="Aperçu du logo" className="h-full w-full object-contain" /> : <Building2 className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">{companyLogo ? companyLogo.name : 'Choisir le logo'}</p>
                      <p className="mt-1 text-xs text-muted-foreground">PNG, JPG ou WEBP</p>
                    </div>
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </label>
                  <input id="company_logo" type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleCompanyLogo} />
                </div>
              </Field>

              <Field label="Site web" htmlFor="website_URL">
                <Input id="website_URL" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} placeholder="https://entreprise.com" className="h-10 rounded-xl shadow-sm" required />
              </Field>

              <Field label="Numéro d'enregistrement" htmlFor="registration_number">
                <Input id="registration_number" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} placeholder="RC-2024-001" className="h-10 rounded-xl shadow-sm" required />
              </Field>

              <Field label="E-mail entreprise" htmlFor="company_email">
                <Input id="company_email" type="email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} placeholder="contact@entreprise.com" className="h-10 rounded-xl shadow-sm" required />
              </Field>

              <Field label="Téléphone entreprise" htmlFor="company_phone">
                <Input id="company_phone" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} placeholder="+213 21 XX XX XX" className="h-10 rounded-xl shadow-sm" required />
              </Field>

              <Field label="Description" htmlFor="description" className="md:col-span-2">
                <Textarea id="description" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} placeholder="Présentez l'entreprise, ses activités et ses besoins d'encadrement." className="min-h-[92px] rounded-xl shadow-sm" required />
              </Field>
            </div>

            {error && (
              <p className="mt-6 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>
            )}

            <div className="mt-9 flex items-center justify-between gap-4">
              <Button type="button" variant="outline" className="rounded-xl" onClick={() => navigate('/signup')}>
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>

              <Button type="submit" disabled={submitting} className="rounded-xl bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy-deep))]">
                {submitting ? 'Envoi en cours...' : "Demander l'ouverture"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </form>
      </section>
    </main>
  )
}

function SectionTitle({ icon: Icon, title }: { icon: typeof ShieldCheck; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))] dark:bg-secondary">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{title}</h2>
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