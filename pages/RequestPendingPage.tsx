import { useEffect } from 'react'
import { CheckCircle2, Clock3, FileCheck2 } from 'lucide-react'
import { Card } from '../lib/shadcn/card'
import { AuthHeader } from './ui/AuthHeader'
import type { SignupDraft } from './data/internPilotData'
import { useNavigate } from 'react-router-dom'

type SignupRequestPageProps = {
  draft: SignupDraft
}

export default function SignupRequestPage({ draft }: SignupRequestPageProps) {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/request-pending')
    }, 1200)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <main className="min-h-screen soft-grid-background text-foreground">
      <AuthHeader />
      <section className="mx-auto flex max-w-[900px] px-6 py-16">
        <Card className="w-full rounded-3xl p-8 text-center shadow-retool-md sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))] dark:bg-secondary">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Demande envoyée</h1>
          <p className="mx-auto mt-3 max-w-[620px] text-base leading-7 text-muted-foreground">
            Votre inscription pour {draft.name || 'votre profil'} est enregistrée. Redirection vers votre espace
            d'attente...
          </p>

          <div className="mx-auto mt-9 grid max-w-[760px] gap-4 sm:grid-cols-3">
            <InfoCard icon={Clock3} title="Vérification" text="Contrôle des coordonnées et de l'entreprise." />
            <InfoCard icon={FileCheck2} title="Documents" text="Convention ou dossier associé au profil." />
            <InfoCard icon={CheckCircle2} title="Activation" text="Compte activé après validation." />
          </div>
        </Card>
      </section>
    </main>
  )
}

function InfoCard({ icon: Icon, text, title }: { icon: typeof Clock3; text: string; title: string }) {
  return (
    <div className="rounded-2xl border bg-background/70 p-5">
      <Icon className="mx-auto h-5 w-5 text-[rgb(var(--intern-blue))]" />
      <p className="mt-3 font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{title}</p>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p>
    </div>
  )
}