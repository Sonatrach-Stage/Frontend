import { useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Image,
  ShieldCheck,
  Upload,
} from 'lucide-react'

import { Button } from '../lib/shadcn/button'
import { Card } from '../lib/shadcn/card'
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

export default function AdminSignupPage() {
  const navigate = useNavigate()

  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profilePreview, setProfilePreview] = useState<string>('')

  const [companyLogo, setCompanyLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>('')

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log('Image administrateur:', profileImage)
    console.log('Logo entreprise:', companyLogo)

    navigate('/signup/request')
  }

  function handleProfileImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("L'image ne doit pas dépasser 5 Mo.")
      return
    }

    setProfileImage(file)
    setProfilePreview(URL.createObjectURL(file))
  }

  function handleCompanyLogo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Le logo ne doit pas dépasser 5 Mo.')
      return
    }

    setCompanyLogo(file)
    setLogoPreview(URL.createObjectURL(file))
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
            Remplissez les informations de l'administrateur et de
            l'entreprise afin de demander l'ouverture de votre espace.
          </p>
        </div>

        <form onSubmit={submitForm}>
          <Card className="rounded-3xl p-8 shadow-retool-md sm:p-10">

            {/* ============================= */}
            {/* COMPTE ADMINISTRATEUR */}
            {/* ============================= */}

            <SectionTitle
              icon={ShieldCheck}
              title="Compte administrateur"
            />

            <div className="mt-5 grid gap-x-4 gap-y-5 md:grid-cols-2">

              <Field
                label="Nom complet"
                htmlFor="admin_name"
              >
                <Input
                  id="admin_name"
                  name="name"
                  placeholder="Amina El Mansouri"
                  className="h-10 rounded-xl shadow-sm"
                  required
                />
              </Field>

              <Field
                label="E-mail professionnel"
                htmlFor="admin_email"
              >
                <Input
                  id="admin_email"
                  name="email"
                  type="email"
                  placeholder="admin@entreprise.com"
                  className="h-10 rounded-xl shadow-sm"
                  required
                />
              </Field>

              <Field
                label="Téléphone"
                htmlFor="admin_phone"
              >
                <Input
                  id="admin_phone"
                  name="phone"
                  placeholder="+213 5 XX XX XX XX"
                  className="h-10 rounded-xl shadow-sm"
                  required
                />
              </Field>

              <Field
                label="Nom de l'entreprise lié au compte"
                htmlFor="company_name_user"
              >
                <Input
                  id="company_name_user"
                  name="company_name_user"
                  placeholder="Atlas Telecom"
                  className="h-10 rounded-xl shadow-sm"
                  required
                />
              </Field>

              <Field
                label="Mot de passe"
                htmlFor="admin_password"
              >
                <Input
                  id="admin_password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-10 rounded-xl shadow-sm"
                  required
                />
              </Field>

              {/* IMAGE PROFIL ADMIN */}

              <Field
                label="Image de profil"
                htmlFor="admin_profile_image"
              >
                <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4">

                  <label
                    htmlFor="admin_profile_image"
                    className="flex cursor-pointer items-center gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))]">
                      {profilePreview ? (
                        <img
                          src={profilePreview}
                          alt="Aperçu du profil"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Image className="h-5 w-5" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-bold">
                        {profileImage
                          ? profileImage.name
                          : 'Choisir une image'}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        PNG, JPG ou WEBP · 5 Mo maximum
                      </p>
                    </div>

                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </label>

                  <input
                    id="admin_profile_image"
                    name="profil_image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleProfileImage}
                  />

                </div>
              </Field>

              <Field
                label="FCM token"
                htmlFor="fcm_token"
              >
                <Input
                  id="fcm_token"
                  name="fcm_token"
                  placeholder="Token notification mobile/web"
                  className="h-10 rounded-xl shadow-sm"
                />
              </Field>

              <Field
                label="Type administrateur"
                htmlFor="ad_type"
              >
                <Select
                  defaultValue="company_admin"
                  name="ad_type"
                >
                  <SelectTrigger
                    id="ad_type"
                    className="h-10 rounded-xl shadow-sm"
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="company_admin">
                      Administrateur d'entreprise
                    </SelectItem>

                    <SelectItem value="super_admin">
                      Super Administrateur
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>

            </div>

            <div className="my-9 h-px bg-border" />

            {/* ============================= */}
            {/* ENTREPRISE */}
            {/* ============================= */}

            <SectionTitle
              icon={Building2}
              title="Entreprise"
            />

            <div className="mt-5 grid gap-x-4 gap-y-5 md:grid-cols-2">

              <Field
                label="ID de l'entreprise"
                htmlFor="company_id"
              >
                <Input
  id="company_id"
  name="company_id"
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  placeholder="Ex. 1"
  className="h-10 rounded-xl border-[rgb(var(--intern-blue))] shadow-sm"
  required
/>
              </Field>

              <Field
                label="Nom"
                htmlFor="company_name"
              >
                <Input
                  id="company_name"
                  name="company_name"
                  placeholder="Atlas Telecom"
                  className="h-10 rounded-xl shadow-sm"
                  required
                />
              </Field>

              <Field
                label="Adresse"
                htmlFor="address"
              >
                <Input
                  id="address"
                  name="address"
                  placeholder="Bab Ezzouar, Alger"
                  className="h-10 rounded-xl shadow-sm"
                  required
                />
              </Field>

              {/* LOGO ENTREPRISE */}

              <Field
                label="Logo de l'entreprise"
                htmlFor="company_logo"
              >
                <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4">

                  <label
                    htmlFor="company_logo"
                    className="flex cursor-pointer items-center gap-4"
                  >

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[rgb(var(--intern-navy))] text-white">

                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Aperçu du logo"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <Building2 className="h-5 w-5" />
                      )}

                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-bold">
                        {companyLogo
                          ? companyLogo.name
                          : 'Choisir le logo'}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        PNG, JPG ou WEBP · 5 Mo maximum
                      </p>
                    </div>

                    <Upload className="h-5 w-5 text-muted-foreground" />

                  </label>

                  <input
                    id="company_logo"
                    name="logo"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleCompanyLogo}
                  />

                </div>
              </Field>

              <Field
                label="Site web"
                htmlFor="website_URL"
              >
                <Input
                  id="website_URL"
                  name="website_URL"
                  placeholder="https://entreprise.com"
                  className="h-10 rounded-xl shadow-sm"
                />
              </Field>

              <Field
                label="Numéro d'enregistrement"
                htmlFor="registration_number"
              >
                <Input
                  id="registration_number"
                  name="registration_number"
                  placeholder="RC-2024-001"
                  className="h-10 rounded-xl shadow-sm"
                />
              </Field>

              <Field
                label="E-mail entreprise"
                htmlFor="company_email"
              >
                <Input
                  id="company_email"
                  name="company_email"
                  type="email"
                  placeholder="contact@entreprise.com"
                  className="h-10 rounded-xl shadow-sm"
                  required
                />
              </Field>

              <Field
                label="Téléphone entreprise"
                htmlFor="company_phone"
              >
                <Input
                  id="company_phone"
                  name="company_phone"
                  placeholder="+213 21 XX XX XX"
                  className="h-10 rounded-xl shadow-sm"
                />
              </Field>

              <Field
                label="Description"
                htmlFor="description"
                className="md:col-span-2"
              >
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Présentez l'entreprise, ses activités et ses besoins d'encadrement."
                  className="min-h-[92px] rounded-xl shadow-sm"
                />
              </Field>

            </div>

            {/* ============================= */}
            {/* BOUTONS */}
            {/* ============================= */}

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
                Demander l'ouverture
                <ArrowRight className="h-4 w-4" />
              </Button>

            </div>

          </Card>
        </form>
      </section>
    </main>
  )
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: typeof ShieldCheck
  title: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))] dark:bg-secondary">
        <Icon className="h-5 w-5" />
      </div>

      <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">
        {title}
      </h2>
    </div>
  )
}

function Field({
  children,
  className,
  htmlFor,
  label,
}: {
  children: ReactNode
  className?: string
  htmlFor: string
  label: string
}) {
  return (
    <div className={className}>
      <label
        className="mb-2 block text-sm font-semibold text-foreground"
        htmlFor={htmlFor}
      >
        {label}
      </label>

      {children}
    </div>
  )
}