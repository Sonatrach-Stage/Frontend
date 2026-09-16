import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, FileCheck2, Lock, Mail, Sparkles, UsersRound } from 'lucide-react'

import { Button } from '../lib/shadcn/button'
import { Input } from '../lib/shadcn/input'
import { BrandLogo } from './ui/BrandLogo'
import { saveCurrentUser, saveTokens, mapBackendRole } from '../lib/auth'
import { login } from '../api/auth'

const highlights = [
  { icon: UsersRound, text: "Demandes d'encadrement, activités et tâches suivies en temps réel" },
  { icon: FileCheck2, text: 'Rapports et mémoires validés puis archivés en bibliothèque documentaire' },
  { icon: Sparkles, text: 'Recherche intelligente et assistants IA sur le contenu des documents' },
]

function initialsOf(name: string) {
  return name.trim().split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase() || '??'
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setError('')
    setLoading(true)

    try {
      const response = await login(email, password)
     
      const backendUser = response.user

      saveTokens(response.accessToken, response.refreshToken)

      saveCurrentUser({
        id: backendUser.id,
        name: backendUser.name,
        email: backendUser.email,
        role: mapBackendRole(backendUser.role),
        status: 'accepted',
        avatarInitials: initialsOf(backendUser.name),
      })

      navigate('/dashboard')
    } catch (err) {
      console.error('Erreur de connexion :', err)
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-card text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[52%_48%]">
        <section
          className="relative flex min-h-[460px] flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat px-8 py-8 text-white sm:px-14 lg:min-h-screen"
          style={{ backgroundImage: "url('/assets/hero-team.jpg')" }}
        >
          <div className="absolute inset-0 bg-[rgba(8,35,68,0.72)]" />
          <div className="relative z-10">
            <BrandLogo inverse />
          </div>

          <div className="relative z-10 max-w-[650px] py-14 lg:py-0">
            <h1 className="max-w-[620px] text-4xl font-black leading-[1.25] tracking-tight sm:text-5xl lg:text-[46px] xl:text-[52px]">
              Le pilotage complet des stages, du dépôt de la convention à la validation du mémoire.
            </h1>
            <p className="mt-8 max-w-[640px] text-base leading-7 text-white/88 sm:text-lg">
              StageLink relie les entreprises, leurs administrateurs, les encadrants et les stagiaires PFE et PFC
              dans un seul environnement professionnel, documenté et assisté par l'intelligence artificielle.
            </p>

            <div className="mt-9 space-y-5">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.text} className="flex items-start gap-4 text-white/92">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/14">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="pt-1 text-[15px] leading-6">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <p className="relative z-10 text-xs text-white/60">Environnement de démonstration — données fictives à visée de prototype.</p>
        </section>

        <section className="flex min-h-screen items-center justify-center bg-card px-7 py-10 lg:px-16">
          <div className="w-full max-w-[420px]">
            <div className="mb-8">
              <h2 className="text-3xl font-black tracking-tight text-[rgb(var(--intern-navy))] dark:text-foreground sm:text-[32px]">
                Connexion à votre espace
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Votre rôle est déterminé automatiquement selon votre compte.
              </p>
            </div>

            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault()
                handleSubmit()
              }}
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-[rgb(var(--intern-navy))] dark:text-foreground" htmlFor="email">
                  Adresse e-mail
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--intern-blue))]" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 rounded-2xl pl-11 text-[15px] shadow-sm"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label className="block text-sm font-semibold text-[rgb(var(--intern-navy))] dark:text-foreground" htmlFor="password">
                    Mot de passe
                  </label>
                  <button type="button" className="text-sm font-semibold text-[rgb(var(--intern-blue))] hover:underline">
                    Mot de passe oublié ?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--intern-blue))]" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-12 rounded-2xl pl-11 text-[15px] shadow-sm"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-2xl bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy-deep))]"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-8 rounded-2xl border bg-card p-5 shadow-sm">
              <p className="font-extrabold text-[rgb(var(--intern-navy))] dark:text-foreground">Pas encore de compte ?</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Les stagiaires et les encadrants créent leur compte en ligne. Les comptes administrateurs d'entreprise
                sont créés par le Super Administrateur.
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