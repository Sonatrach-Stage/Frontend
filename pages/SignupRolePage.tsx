import { Link, useNavigate } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Check, GraduationCap, ShieldCheck, UserCog } from 'lucide-react'
import { Button } from '../lib/shadcn/button'
import { Card } from '../lib/shadcn/card'
import { AuthHeader } from './ui/AuthHeader'
import { cn } from '../lib/shadcn/utils'
import type { SignupDraft, SignupRole } from './data/internPilotData'

type SignupRolePageProps = {
  draft: SignupDraft
  updateDraft: (changes: Partial<SignupDraft>) => void
}

const roles: Array<{
  id: SignupRole
  title: string
  description: string
  icon: LucideIcon
  bullets: string[]
}> = [
  {
    id: 'intern',
    title: 'Je suis stagiaire',
    description: 'Stage PFE ou PFC dans une entreprise partenaire.',
    icon: GraduationCap,
    bullets: ['Choix du type de stage', "Sélection de l'entreprise", "Demande d'encadrement"],
  },
  {
    id: 'supervisor',
    title: 'Je suis encadrant',
    description: 'Professionnel accompagnant des stagiaires.',
    icon: UserCog,
    bullets: ['Rattachement à une entreprise', 'Profil professionnel', "Validation par l'administrateur"],
  },
  {
    id: 'company-admin',
    title: 'Je suis administrateur',
    description: "Responsable de la gestion d'une entreprise.",
    icon: ShieldCheck,
    bullets: ['Compte créé par le Super Administrateur', "Demande d'ouverture d'espace"],
  },
]

export default function SignupRolePage({ draft, updateDraft }: SignupRolePageProps) {
  const navigate = useNavigate()

  function chooseRole(role: SignupRole) {
    updateDraft({ role })
  }

  function continueToNext() {
    if (draft.role === 'company-admin') {
      navigate('/signup/admin')
      return
    }
    navigate('/signup/information')
  }

  return (
    <main className="min-h-screen soft-grid-background text-foreground">
      <AuthHeader />
      <section className="mx-auto max-w-[1190px] px-6 py-14">
        <div className="max-w-[760px]">
          <h1 className="text-4xl font-black tracking-tight text-[rgb(var(--intern-navy))] dark:text-foreground">Quel est votre rôle ?</h1>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Chaque rôle dispose d'un parcours d'inscription dédié. Aucun accès visiteur n'est proposé : un compte est
            obligatoire pour utiliser la plateforme.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon
            const selected = draft.role === role.id
            return (
              <button key={role.id} type="button" onClick={() => chooseRole(role.id)} className="text-left">
                <Card
                  className={cn(
                    'h-full rounded-3xl p-8 shadow-retool-sm transition-all hover:-translate-y-1 hover:border-[rgb(var(--intern-blue))] hover:shadow-retool-md',
                    selected && 'border-[rgb(var(--intern-blue))] bg-[rgb(var(--intern-soft-blue))]',
                  )}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))] dark:bg-secondary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-7 text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{role.title}</h2>
                  <p className="mt-3 min-h-[52px] text-base leading-6 text-muted-foreground">{role.description}</p>
                  <ul className="mt-7 space-y-3 text-sm text-muted-foreground">
                    {role.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-[rgb(var(--intern-blue))]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 inline-flex items-center gap-2 text-base font-bold text-[rgb(var(--intern-blue))]">
                    Continuer
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Card>
              </button>
            )
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            type="button"
            className="rounded-xl bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy-deep))]"
            disabled={!draft.role}
            onClick={continueToNext}
          >
            Continuer
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <Link to="/" className="mt-3 inline-flex text-sm font-semibold text-muted-foreground hover:text-foreground">
          Retour à la connexion
        </Link>
      </section>
    </main>
  )
}
