import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'

import {
  ArrowRight,
  Building2,
  FileCheck2,
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCog,
  UsersRound,
} from 'lucide-react'

import { Button } from '../lib/shadcn/button'
import { Input } from '../lib/shadcn/input'
import { cn } from '../lib/shadcn/utils'
import { BrandLogo } from './ui/BrandLogo'
import type { Role } from './data/internPilotData'
import { saveCurrentUser } from '../lib/auth'

const loginRoles: Array<{
  id: Role
  title: string
  description: string
  icon: LucideIcon
}> = [
  {
    id: 'super-admin',
    title: 'Super Administrateur',
    description: 'Pilotage global de la plateforme',
    icon: ShieldCheck,
  },
  {
    id: 'company-admin',
    title: "Administrateur d'entreprise",
    description: "Gestion d'une entreprise",
    icon: Building2,
  },
  {
    id: 'supervisor',
    title: 'Encadrant',
    description: 'Encadrement des stagiaires',
    icon: UserCog,
  },
  {
    id: 'intern',
    title: 'Stagiaire',
    description: 'Parcours PFE ou PFC',
    icon: GraduationCap,
  },
]

const highlights = [
  {
    icon: UsersRound,
    text: "Demandes d'encadrement, activités et tâches suivies en temps réel",
  },
  {
    icon: FileCheck2,
    text: 'Rapports et mémoires validés puis archivés en bibliothèque documentaire',
  },
  {
    icon: Sparkles,
    text: 'Recherche intelligente et assistants IA sur le contenu des documents',
  },
]

// Profil de démonstration selon le rôle sélectionné
const demoProfiles: Record<
  Role,
  {
    name: string
    companyName?: string
    avatarInitials: string
    internType?: 'PFE' | 'PFC'
  }
> = {
  'super-admin': {
    name: 'Admin Système',
    avatarInitials: 'AS',
  },

  'company-admin': {
    name: 'Ahmed Benali',
    companyName: 'ABC',
    avatarInitials: 'AB',
  },

  supervisor: {
    name: 'Karim Bennani',
    companyName: 'Atlas Telecom',
    avatarInitials: 'KB',
  },

  intern: {
    name: 'Sara Amrani',
    companyName: 'Atlas Telecom',
    avatarInitials: 'SA',
    internType: 'PFE',
  },
}

export default function LoginPage() {
  const navigate = useNavigate()

  const [selectedRole, setSelectedRole] =
    useState<Role>('supervisor')

  const [email, setEmail] =
    useState('demo@internpilot.app')

  function handleSubmit() {
    const profile = demoProfiles[selectedRole]

    saveCurrentUser({
      id: 1,
      name: profile.name,
      email,
      role: selectedRole,
      companyName: profile.companyName,
      status: 'accepted',
      avatarInitials: profile.avatarInitials,
      internType: profile.internType,
    })

    navigate('/dashboard')
  }

  return (
    <main className="min-h-screen bg-card text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[52%_48%]">

        {/* =========================
            PARTIE GAUCHE
        ========================= */}
        <section
          className="
            relative
            flex
            min-h-[460px]
            flex-col
            justify-between
            overflow-hidden
            bg-cover
            bg-center
            bg-no-repeat
            px-8
            py-8
            text-white
            sm:px-14
            lg:min-h-screen
          "
          style={{
            backgroundImage: "url('/assets/hero-team.jpg')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[rgba(8,35,68,0.72)]" />

          {/* Logo */}
          <div className="relative z-10">
            <BrandLogo inverse />
          </div>

          {/* Présentation */}
          <div className="relative z-10 max-w-[650px] py-14 lg:py-0">
            <h1
              className="
                max-w-[620px]
                text-4xl
                font-black
                leading-[1.25]
                tracking-tight
                sm:text-5xl
                lg:text-[46px]
                xl:text-[52px]
              "
            >
              Le pilotage complet des stages, du dépôt de la convention à la validation du mémoire.
            </h1>

            <p
              className="
                mt-8
                max-w-[640px]
                text-base
                leading-7
                text-white/88
                sm:text-lg
              "
            >
              StageLink relie les entreprises, leurs administrateurs,
              les encadrants et les stagiaires PFE et PFC dans un seul
              environnement professionnel, documenté et assisté par
              l'intelligence artificielle.
            </p>

            {/* Fonctionnalités */}
            <div className="mt-9 space-y-5">
              {highlights.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.text}
                    className="flex items-start gap-4 text-white/92"
                  >
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-white/14
                      "
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <p className="pt-1 text-[15px] leading-6">
                      {item.text}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <p className="relative z-10 text-xs text-white/60">
            Environnement de démonstration — données fictives à visée de prototype.
          </p>
        </section>

        {/* =========================
            PARTIE DROITE
        ========================= */}
        <section
          className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-card
            px-7
            py-10
            lg:px-16
          "
        >
          <div className="w-full max-w-[512px]">

            {/* Titre */}
            <div className="mb-8">
              <h2
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  text-[rgb(var(--intern-navy))]
                  dark:text-foreground
                  sm:text-[32px]
                "
              >
                Connexion à votre espace
              </h2>

              <p className="mt-3 text-sm text-muted-foreground">
                Sélectionnez votre rôle pour accéder au tableau de bord correspondant.
              </p>
            </div>

            {/* Choix du rôle */}
            <div className="grid gap-4 sm:grid-cols-2">
              {loginRoles.map((role) => {
                const Icon = role.icon
                const isSelected = selectedRole === role.id

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      `
                        rounded-2xl
                        border
                        bg-card
                        p-4
                        text-left
                        transition-all
                        hover:border-[rgb(var(--intern-blue))]
                        hover:shadow-retool-sm
                      `,
                      isSelected &&
                        `
                          border-[rgb(var(--intern-blue))]
                          bg-[rgb(var(--intern-soft-blue))]
                          shadow-retool-md
                        `,
                    )}
                  >
                    <Icon
                      className={cn(
                        'mb-5 h-5 w-5 text-muted-foreground',
                        isSelected &&
                          'text-[rgb(var(--intern-blue))]',
                      )}
                    />

                    <p
                      className="
                        text-[15px]
                        font-extrabold
                        text-[rgb(var(--intern-navy))]
                        dark:text-foreground
                      "
                    >
                      {role.title}
                    </p>

                    <p className="mt-2 text-xs text-muted-foreground">
                      {role.description}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Formulaire */}
            <form
              className="mt-8 space-y-5"
              onSubmit={(event) => {
                event.preventDefault()
                handleSubmit()
              }}
            >

              {/* Email */}
              <div>
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-[rgb(var(--intern-navy))]
                    dark:text-foreground
                  "
                  htmlFor="email"
                >
                  Adresse e-mail professionnelle
                </label>

                <div className="relative">
                  <Mail
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      text-[rgb(var(--intern-blue))]
                    "
                  />

                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    className="
                      h-12
                      rounded-2xl
                      pl-11
                      text-[15px]
                      shadow-sm
                    "
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <label
                    className="
                      block
                      text-sm
                      font-semibold
                      text-[rgb(var(--intern-navy))]
                      dark:text-foreground
                    "
                    htmlFor="password"
                  >
                    Mot de passe
                  </label>

                  <button
                    type="button"
                    className="
                      text-sm
                      font-semibold
                      text-[rgb(var(--intern-blue))]
                      hover:underline
                    "
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                <div className="relative">
                  <Lock
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      text-[rgb(var(--intern-blue))]
                    "
                  />

                  <Input
                    id="password"
                    type="password"
                    defaultValue="password"
                    className="
                      h-12
                      rounded-2xl
                      pl-11
                      text-[15px]
                      shadow-sm
                    "
                  />
                </div>
              </div>

              {/* Connexion */}
              <Button
                type="submit"
                className="
                  h-12
                  w-full
                  rounded-2xl
                  bg-[rgb(var(--intern-navy))]
                  text-white
                  hover:bg-[rgb(var(--intern-navy-deep))]
                "
              >
                Se connecter

                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {/* Création de compte */}
            <div
              className="
                mt-8
                rounded-2xl
                border
                bg-card
                p-5
                shadow-sm
              "
            >
              <p
                className="
                  font-extrabold
                  text-[rgb(var(--intern-navy))]
                  dark:text-foreground
                "
              >
                Pas encore de compte ?
              </p>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-muted-foreground
                "
              >
                Les stagiaires et les encadrants créent leur compte en ligne.
                Les comptes administrateurs d'entreprise sont créés par le
                Super Administrateur.
              </p>

              <Button
                type="button"
                variant="outline"
                className="
                  mt-4
                  h-11
                  w-full
                  rounded-2xl
                  font-bold
                "
                onClick={() => navigate('/signup')}
              >
                Créer un compte
              </Button>
            </div>

          </div>
        </section>
      </div>
    </main>
  )
}