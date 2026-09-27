import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  FileCheck2,
  Lock,
  Mail,
  Sparkles,
  UsersRound,
} from 'lucide-react'

import { Button } from '../lib/shadcn/button'
import { Input } from '../lib/shadcn/input'
import { BrandLogo } from './ui/BrandLogo'
import { saveCurrentUser, saveTokens, mapBackendRole } from '../lib/auth'
import { login } from '../services/auth'

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

function initialsOf(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || '??'
  )
}

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setError('')

    if (!email.trim()) {
      setError("Veuillez saisir votre adresse e-mail.")
      return
    }

    if (!password) {
      setError('Veuillez saisir votre mot de passe.')
      return
    }

    setLoading(true)

    try {
      const response = await login(email.trim(), password)

      const backendUser = response.user

      // Sauvegarder les tokens
      saveTokens(
        response.accessToken,
        response.refreshToken
      )

      // Sauvegarder l'utilisateur connecté
      saveCurrentUser({
        id: backendUser.id,
        name: backendUser.name,
        email: backendUser.email,
        role: mapBackendRole(backendUser.role),
        status: 'accepted',
        avatarInitials: initialsOf(backendUser.name),
      })

      // Aller vers le dashboard
      navigate('/dashboard')
    } catch (err) {
      console.error('Erreur de connexion :', err)

      setError(
        err instanceof Error
          ? err.message
          : 'Erreur lors de la connexion.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-card text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[52%_48%]">

        {/* =====================================================
            PARTIE GAUCHE
        ====================================================== */}

        <section
          className="relative flex min-h-[460px] flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat px-8 py-8 text-white sm:px-14 lg:min-h-screen"
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

          {/* Texte principal */}
          <div className="relative z-10 max-w-[650px] py-14 lg:py-0">

            <h1 className="max-w-[620px] text-4xl font-black leading-[1.25] tracking-tight sm:text-5xl lg:text-[46px] xl:text-[52px]">
              Le pilotage complet des stages, du dépôt de la convention à la validation du mémoire.
            </h1>

            <p className="mt-8 max-w-[640px] text-base leading-7 text-white/88 sm:text-lg">
              StageLink relie les entreprises, leurs administrateurs,
              les encadrants et les stagiaires PFE et PFC dans un seul
              environnement professionnel, documenté et assisté par
              l'intelligence artificielle.
            </p>

            {/* Points forts */}
            <div className="mt-9 space-y-5">

              {highlights.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.text}
                    className="flex items-start gap-4 text-white/92"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/14">
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

          {/* Bas de page */}
          <p className="relative z-10 text-xs text-white/60" />
        </section>

        {/* =====================================================
            PARTIE DROITE
        ====================================================== */}

        <section className="flex min-h-screen items-center justify-center bg-card px-7 py-10 lg:px-16">

          <div className="w-full max-w-[420px]">

            {/* Titre */}
            <div className="mb-8">

              <h2 className="text-3xl font-black tracking-tight text-[rgb(var(--intern-navy))] dark:text-foreground sm:text-[32px]">
                Connexion à votre espace
              </h2>

              <p className="mt-3 text-sm text-muted-foreground">
                
              </p>

            </div>

            {/* =================================================
                FORMULAIRE DE CONNEXION
            ================================================== */}

            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault()
                handleSubmit()
              }}
            >

              {/* EMAIL */}

              <div>

                <label
                  className="mb-2 block text-sm font-semibold text-[rgb(var(--intern-navy))] dark:text-foreground"
                  htmlFor="email"
                >
                  Adresse e-mail
                </label>

                <div className="relative">

                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--intern-blue))]" />

                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="exemple@email.com"
                    autoComplete="email"
                    className="h-12 rounded-2xl pl-11 text-[15px] shadow-sm"
                  />

                </div>

              </div>

              {/* MOT DE PASSE */}

              <div>

                <div className="mb-2 flex items-center justify-between gap-4">

                  <label
                    className="block text-sm font-semibold text-[rgb(var(--intern-navy))] dark:text-foreground"
                    htmlFor="password"
                  >
                    Mot de passe
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      navigate('/forgot-password')
                    }
                    className="text-sm font-semibold text-[rgb(var(--intern-blue))] hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>

                </div>

                <div className="relative">

                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--intern-blue))]" />

                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Votre mot de passe"
                    autoComplete="current-password"
                    className="h-12 rounded-2xl pl-11 text-[15px] shadow-sm"
                  />

                </div>

              </div>

              {/* MESSAGE D'ERREUR */}

              {error && (
                <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">
                  {error}
                </p>
              )}

              {/* BOUTON CONNEXION */}

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-2xl bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy-deep))]"
              >
                {loading ? 'Connexion...' : 'Se connecter'}

                {!loading && (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>

            </form>

            {/* =================================================
                SÉPARATEUR
            ================================================== */}

            <div className="mt-6 flex items-center gap-3">

              <div className="h-px flex-1 bg-border" />

              <span className="text-xs font-semibold text-muted-foreground">
                OU
              </span>

              <div className="h-px flex-1 bg-border" />

            </div>

            {/* =================================================
                CONNEXION GOOGLE
            ================================================== */}

            <a
              href="https://stagelink-lq6s.onrender.com/auth/google"
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border font-bold transition hover:bg-muted"
            >

              {/* Logo Google */}

              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M21.35 12.23c0-.79-.07-1.55-.22-2.28H12v4.31h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
                />

                <path
                  fill="#34A853"
                  d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"
                />

                <path
                  fill="#FBBC05"
                  d="M6.54 13.59A5.85 5.85 0 0 1 6.23 12c0-.55.11-1.08.31-1.59V7.88H3.3A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.12l3.24-2.53Z"
                />

                <path
                  fill="#EA4335"
                  d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.46 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 8.1 9.46 6.38 12 6.38Z"
                />
              </svg>

              Continuer avec Google

            </a>

            {/* =================================================
                CRÉATION DE COMPTE
            ================================================== */}

            <div className="mt-8 rounded-2xl border bg-card p-5 shadow-sm">

              <p className="font-extrabold text-[rgb(var(--intern-navy))] dark:text-foreground">
                Pas encore de compte ?
              </p>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                
              </p>

              <Button
                type="button"
                variant="outline"
                className="mt-4 h-11 w-full rounded-2xl font-bold"
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