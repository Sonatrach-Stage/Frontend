import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Bell, Search } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'

import { Badge } from '../../lib/shadcn/badge'
import { Input } from '../../lib/shadcn/input'
import { cn } from '../../lib/shadcn/utils'
import { BrandLogo } from '../ui/BrandLogo'
import { UserMenu } from './shared/UserMenu'
import type { CurrentUser } from '../../lib/auth'
import { getUnreadCount } from '../../services/notifications'

export type NavItem = {
  label: string
  icon: LucideIcon
  path: string
}

type DashboardLayoutProps = {
  basePath: string
  navItems: NavItem[]
  roleLabel: string
  user: CurrentUser
}

export function DashboardLayout({
  basePath,
  navItems,
  roleLabel,
  user,
}: DashboardLayoutProps) {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    getUnreadCount()
      .then((res) => setUnreadCount(res.count))
      .catch(() => {})
  }, [])

  return (
    <main className="min-h-screen bg-[rgb(var(--intern-page))] text-foreground dark:bg-background">
      {/* SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[267px] flex-col bg-[rgb(var(--intern-navy-deep))] text-white lg:flex">
        {/* LOGO */}
        <div className="px-7 py-8">
          <Link
            to={basePath}
            aria-label="Retour à l'accueil du tableau de bord"
          >
            <BrandLogo inverse />
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-2 [scrollbar-color:rgba(255,255,255,0.25)_transparent] [scrollbar-width:thin]">
          {navItems.map((item) => {
            const Icon = item.icon
            const to =
              item.path === '' ? basePath : `${basePath}/${item.path}`

            return (
              <NavLink
                key={item.label}
                to={to}
                end={item.path === ''}
                className={({ isActive }) =>
                  cn(
                    'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-white/78 transition-colors hover:bg-white/10 hover:text-white',
                    isActive &&
                      'bg-[rgb(var(--intern-blue))] text-white shadow-retool-sm',
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        {/* INFORMATIONS UTILISATEUR */}
        <div className="border-t border-white/10 p-5">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/55">
            Espace connecté
          </p>

          <p className="mt-3 text-sm font-black">
            {roleLabel}
          </p>

          {user.companyName ? (
            <p className="mt-1 text-xs text-white/65">
              {user.companyName}
            </p>
          ) : null}
        </div>
      </aside>

      {/* CONTENU PRINCIPAL */}
      <section className="lg:pl-[267px]">
        {/* HEADER */}
        <header className="sticky top-0 z-10 flex h-[74px] items-center justify-between gap-4 border-b bg-card/95 px-6 backdrop-blur">
          {/* RECHERCHE */}
          <div className="relative w-full max-w-[450px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Rechercher..."
              className="h-10 rounded-2xl bg-background pl-11 shadow-sm"
            />
          </div>

          {/* ACTIONS HEADER */}
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="hidden rounded-full px-4 py-2 font-semibold sm:inline-flex"
            >
              Vue: {roleLabel}
            </Badge>

            {/* NOTIFICATIONS */}
            <Link
              to={`${basePath}/notifications`}
              aria-label="Notifications"
              className="relative rounded-full p-2 hover:bg-accent"
            >
              <Bell className="h-5 w-5 text-foreground" />

              {unreadCount > 0 && (
                <span className="absolute right-1 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>

            {/* MENU UTILISATEUR */}
            <UserMenu
              user={user}
              roleLabel={roleLabel}
              basePath={basePath}
            />
          </div>
        </header>

        {/* PAGE */}
        <div className="p-6 sm:p-8">
          <Outlet />
        </div>
      </section>
    </main>
  )
}