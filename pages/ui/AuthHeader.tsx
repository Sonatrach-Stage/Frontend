import { Link } from 'react-router-dom'
import { BrandLogo } from './BrandLogo'

export function AuthHeader() {
  return (
    <header className="border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-[74px] max-w-[1190px] items-center justify-between px-6">
        <Link to="/" aria-label="Retour à la connexion">
          <BrandLogo />
        </Link>
        <Link to="/" className="text-sm font-semibold text-foreground hover:text-[rgb(var(--intern-blue))]">
          J'ai déjà un compte
        </Link>
      </div>
    </header>
  )
}
