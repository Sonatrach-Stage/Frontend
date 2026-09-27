import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Settings, User as UserIcon } from 'lucide-react'
import { clearCurrentUser, getRefreshToken } from '../../../lib/auth'
import { logout } from '../../../services/auth'
import type { CurrentUser } from '../../../lib/auth'

export function UserMenu({ user, roleLabel, basePath }: { user: CurrentUser; roleLabel: string; basePath: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleLogout() {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      try {
        await logout(refreshToken)
      } catch {
        // même si l'appel échoue côté serveur, on déconnecte localement
      }
    }
    clearCurrentUser()
    navigate('/')
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 rounded-full border bg-card py-1 pl-1 pr-3 shadow-sm"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgb(var(--intern-navy))] text-sm font-black text-white">
          {user.avatarInitials}
        </div>
        <div className="hidden text-left leading-tight sm:block">
          <p className="text-xs font-bold text-foreground">{user.name}</p>
          <p className="text-[11px] text-muted-foreground">{roleLabel}</p>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-52 overflow-hidden rounded-2xl border bg-card shadow-retool-md">
          <Link
            to={`${basePath}/profil`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted"
          >
            <UserIcon className="h-4 w-4" />
            Mon profil
          </Link>
          <Link
            to={`${basePath}/profil`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted"
          >
            <Settings className="h-4 w-4" />
            Paramètres
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 border-t px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  )
}