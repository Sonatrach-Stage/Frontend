import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { saveCurrentUser, saveTokens, mapBackendRole } from '../lib/auth'

function initialsOf(name: string) {
  return name.trim().split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase() || '??'
}

export default function GoogleCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    // ⚠️ HYPOTHÈSE : le backend redirige vers cette page avec les tokens en paramètres d'URL
    // (?accessToken=...&refreshToken=...&userId=...&name=...&email=...&role=...)
    // À CONFIRMER avec le backend — les noms exacts des paramètres peuvent être différents.
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')
    const name = searchParams.get('name')
    const email = searchParams.get('email')
    const role = searchParams.get('role')
    const id = searchParams.get('id')

    if (!accessToken || !refreshToken || !name || !email || !role) {
      setError("Connexion Google incomplète — données manquantes dans l'URL de retour.")
      return
    }

    saveTokens(accessToken, refreshToken)
    saveCurrentUser({
      id: Number(id) || 0,
      name,
      email,
      role: mapBackendRole(role),
      status: 'accepted',
      avatarInitials: initialsOf(name),
    })

    navigate('/dashboard')
  }, [searchParams, navigate])

  return (
    <main className="flex min-h-screen items-center justify-center bg-card text-foreground">
      <div className="text-center">
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <p className="text-muted-foreground">Connexion en cours...</p>
        )}
      </div>
    </main>
  )
}