import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, KeyRound, Lock, Mail } from 'lucide-react'
import { Button } from '../lib/shadcn/button'
import { Card } from '../lib/shadcn/card'
import { Input } from '../lib/shadcn/input'
import { AuthHeader } from './ui/AuthHeader'
import { forgotPassword, verifyResetOtp, resetPassword } from '../api/auth'

type Step = 'email' | 'otp' | 'password' | 'done'

export default function ForgotPasswordFlowPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSendOtp() {
    setError('')
    setLoading(true)
    try {
      await forgotPassword(email)
      setStep('otp')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi du code')
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOtp() {
    setError('')
    setLoading(true)
    try {
      await verifyResetOtp(email, otp)
      setStep('password')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Code invalide ou expiré')
    } finally {
      setLoading(false)
    }
  }

  async function handleResetPassword() {
    setError('')
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    setLoading(true)
    try {
      await resetPassword(email, password, confirmPassword)
      setStep('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la réinitialisation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen soft-grid-background text-foreground">
      <AuthHeader />
      <section className="mx-auto flex max-w-[480px] px-6 py-16">
        <Card className="w-full rounded-3xl p-8 shadow-retool-md sm:p-10">
          {step === 'email' && (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))] dark:bg-secondary">
                <Mail className="h-6 w-6" />
              </div>
              <h1 className="mt-5 text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mot de passe oublié</h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Saisissez votre adresse email. Si un compte existe, un code de vérification vous sera envoyé.
              </p>
              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold text-foreground" htmlFor="reset_email">Email</label>
                <Input id="reset_email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl" />
              </div>
              {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}
              <Button disabled={loading || !email} className="mt-6 w-full rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={handleSendOtp}>
                {loading ? 'Envoi...' : 'Envoyer le code'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {step === 'otp' && (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))] dark:bg-secondary">
                <KeyRound className="h-6 w-6" />
              </div>
              <h1 className="mt-5 text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Vérifiez le code</h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Saisissez le code reçu à <span className="font-semibold text-foreground">{email}</span>.
              </p>
              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold text-foreground" htmlFor="reset_otp">Code</label>
                <Input id="reset_otp" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} className="h-11 rounded-xl text-center tracking-[0.3em]" />
              </div>
              {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}
              <Button disabled={loading || otp.length < 4} className="mt-6 w-full rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={handleVerifyOtp}>
                {loading ? 'Vérification...' : 'Vérifier'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {step === 'password' && (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))] dark:bg-secondary">
                <Lock className="h-6 w-6" />
              </div>
              <h1 className="mt-5 text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Nouveau mot de passe</h1>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground" htmlFor="new_password">Nouveau mot de passe</label>
                  <Input id="new_password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-xl" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground" htmlFor="confirm_new_password">Confirmer</label>
                  <Input id="confirm_new_password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-11 rounded-xl" />
                </div>
              </div>
              {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}
              <Button disabled={loading || !password || !confirmPassword} className="mt-6 w-full rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={handleResetPassword}>
                {loading ? 'Enregistrement...' : 'Réinitialiser le mot de passe'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {step === 'done' && (
            <>
              <h1 className="text-2xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mot de passe réinitialisé</h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
              </p>
              <Button className="mt-6 w-full rounded-xl bg-[rgb(var(--intern-navy))] text-white" onClick={() => navigate('/')}>
                Retour à la connexion
              </Button>
            </>
          )}
        </Card>
      </section>
    </main>
  )
}