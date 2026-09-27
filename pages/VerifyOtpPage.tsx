import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react'
import { Button } from '../lib/shadcn/button'
import { Card } from '../lib/shadcn/card'
import { Input } from '../lib/shadcn/input'
import { AuthHeader } from './ui/AuthHeader'
import { verifyEmailOtp, resendOtp } from '../services/auth'
import type { SignupDraft } from './data/internPilotData'

type VerifyOtpPageProps = {
  draft: SignupDraft
}

export default function VerifyOtpPage({ draft }: VerifyOtpPageProps) {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  console.log('Email dans le draft:', draft.email)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)

  async function handleVerify() {
    setError('')
    setInfo('')
    setLoading(true)

    try {
      await verifyEmailOtp(draft.email, otp)
      navigate('/request-pending')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Code invalide ou expiré')
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setError('')
    setInfo('')
    setResending(true)

    try {
      await resendOtp(draft.email)
      setInfo('Un nouveau code a été envoyé à votre adresse email.')
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de renvoyer le code")
    } finally {
      setResending(false)
    }
  }

  return (
    <main className="min-h-screen soft-grid-background text-foreground">
      <AuthHeader />
      <section className="mx-auto flex max-w-[560px] px-6 py-16">
        <Card className="w-full rounded-3xl p-8 text-center shadow-retool-md sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))] dark:bg-secondary">
            <Mail className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Vérifiez votre email</h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            Un code à 6 chiffres a été envoyé à <span className="font-semibold text-foreground">{draft.email}</span>. Saisissez-le
            ci-dessous pour finaliser votre inscription.
          </p>

          <div className="mt-6 text-left">
            <label className="mb-2 block text-sm font-semibold text-foreground" htmlFor="otp">
              Code de vérification
            </label>
            <Input
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="482913"
              maxLength={6}
              className="h-12 rounded-xl text-center text-lg tracking-[0.3em]"
            />
          </div>

          {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}
          {info && <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-600">{info}</p>}

          <Button
            type="button"
            disabled={loading || otp.length < 4}
            className="mt-6 w-full rounded-xl bg-[rgb(var(--intern-navy))] text-white hover:bg-[rgb(var(--intern-navy-deep))]"
            onClick={handleVerify}
          >
            {loading ? 'Vérification...' : 'Vérifier le code'}
            <ArrowRight className="h-4 w-4" />
          </Button>

          <button
            type="button"
            disabled={resending}
            onClick={handleResend}
            className="mt-4 text-sm font-semibold text-[rgb(var(--intern-blue))] hover:underline disabled:opacity-50"
          >
            {resending ? 'Envoi...' : 'Renvoyer le code'}
          </button>

          <div className="mx-auto mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
            Le code expire après un délai limité.
          </div>
        </Card>
      </section>
    </main>
  )
}