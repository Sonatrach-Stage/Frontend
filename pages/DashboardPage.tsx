import type { LucideIcon } from 'lucide-react'
import {
  Bell,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  CheckSquare,
  FileText,
  FolderOpen,
  Grid2X2,
  MessageSquare,
  Search,
  User,
  UserCog,
} from 'lucide-react'
import { Badge } from '../lib/shadcn/badge'
import { Card } from '../lib/shadcn/card'
import { Input } from '../lib/shadcn/input'
import { cn } from '../lib/shadcn/utils'
import { activityItems, dashboardStats } from './data/internPilotData'
import { BrandLogo } from './ui/BrandLogo'

const navigationItems: Array<{ label: string; icon: LucideIcon; active?: boolean }> = [
  { label: 'Tableau de bord', icon: Grid2X2, active: true },
  { label: 'Mon stage', icon: BriefcaseBusiness },
  { label: 'Mon encadrant', icon: UserCog },
  { label: 'Mes activités', icon: CalendarDays },
  { label: 'Mes tâches', icon: CheckSquare },
  { label: 'Calendrier', icon: CalendarDays },
  { label: 'Messages', icon: MessageSquare },
  { label: 'Mon rapport / mémoire', icon: FileText },
  { label: 'Documents', icon: FolderOpen },
  { label: 'Assistant IA', icon: Bot },
  { label: 'Notifications', icon: Bell },
  { label: 'Profil', icon: User },
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[rgb(var(--intern-page))] text-foreground dark:bg-background">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[267px] flex-col bg-[rgb(var(--intern-navy-deep))] text-white lg:flex">
        <div className="px-7 py-8">
          <BrandLogo inverse />
        </div>

        <nav className="flex-1 space-y-2 px-3">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                type="button"
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-white/78 transition-colors hover:bg-white/10 hover:text-white',
                  item.active && 'bg-[rgb(var(--intern-blue))] text-white shadow-retool-sm',
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-5">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/55">Espace connecté</p>
          <p className="mt-3 text-sm font-black">Stagiaire</p>
          <p className="mt-1 text-xs text-white/65">Atlas Telecom</p>
        </div>
      </aside>

      <section className="lg:pl-[267px]">
        <header className="sticky top-0 z-10 flex h-[74px] items-center justify-between gap-4 border-b bg-card/95 px-6 backdrop-blur">
          <div className="relative w-full max-w-[450px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un stagiaire, un mémoire, une entreprise..."
              className="h-10 rounded-2xl bg-background pl-11 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="hidden rounded-full px-4 py-2 font-semibold sm:inline-flex">
              Vue: Stagiaire
            </Badge>
            <button type="button" aria-label="Notifications" className="relative rounded-full p-2 hover:bg-accent">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute right-1 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                3
              </span>
            </button>
            <div className="flex items-center gap-3 rounded-full border bg-card py-1 pl-1 pr-3 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgb(var(--intern-navy))] text-sm font-black text-white">IT</div>
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-bold text-foreground">Imane Tazi</p>
                <p className="text-[11px] text-muted-foreground">Stagiaire</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 sm:p-8">
          <div className="mb-7 flex flex-col gap-2">
            <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Tableau de bord</h1>
            <p className="text-sm text-muted-foreground">Suivi de stage, documents, tâches et validations en un seul espace.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dashboardStats.map((stat) => (
              <Card key={stat.label} className="rounded-3xl p-5 shadow-retool-sm">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-3 text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{stat.value}</p>
                <p className="mt-2 text-xs font-semibold text-[rgb(var(--intern-blue))]">{stat.trend}</p>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
            <Card className="rounded-3xl p-6 shadow-retool-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Activité récente</h2>
                <Badge className="bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-navy))] hover:bg-[rgb(var(--intern-soft-blue))] dark:bg-secondary dark:text-foreground">
                  PFE
                </Badge>
              </div>
              <div className="mt-5 space-y-3">
                {activityItems.map((item) => (
                  <div key={item.title} className="flex items-center justify-between gap-4 rounded-2xl border bg-background/70 p-4">
                    <div>
                      <p className="font-bold text-foreground">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.meta}</p>
                    </div>
                    <Badge variant="outline" className="rounded-full whitespace-nowrap">
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-3xl p-6 shadow-retool-sm">
              <h2 className="text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mon encadrant</h2>
              <div className="mt-5 flex items-start gap-4 rounded-2xl bg-[rgb(var(--intern-soft-blue))] p-5 dark:bg-secondary">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card font-black text-[rgb(var(--intern-navy))] shadow-sm dark:text-foreground">
                  KB
                </div>
                <div>
                  <p className="font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Karim Bennani</p>
                  <p className="mt-1 text-sm text-muted-foreground">Architecte réseau senior</p>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">
                    Département Infrastructure · Spécialisation Réseaux & Cloud hybride · 12 ans d'expérience
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
