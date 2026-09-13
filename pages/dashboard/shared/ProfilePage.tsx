import { Camera, Save } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Button } from '../../../lib/shadcn/button'
import { getCurrentUser } from '../../../lib/auth'

type ExtraField = { label: string; defaultValue?: string }

export function ProfilePage({ roleLabel, extraFields = [] }: { roleLabel: string; extraFields?: ExtraField[] }) {
  const user = getCurrentUser()

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Profil</h1>
        <p className="mt-2 text-sm text-muted-foreground">Gérez vos informations personnelles et professionnelles.</p>
      </div>

      <Card className="max-w-2xl rounded-3xl p-8 shadow-retool-sm">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[rgb(var(--intern-soft-blue))] text-2xl font-black text-[rgb(var(--intern-navy))]">
              {user?.avatarInitials ?? '??'}
            </div>
            <button type="button" className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[rgb(var(--intern-navy))] text-white">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <p className="text-lg font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{user?.name}</p>
            <p className="text-sm text-muted-foreground">
              {roleLabel}{user?.companyName ? ` · ${user.companyName}` : ''}
            </p>
          </div>
        </div>

        <p className="mt-8 text-xs font-bold uppercase tracking-wide text-muted-foreground">Informations personnelles</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Nom complet</label>
            <Input defaultValue={user?.name} className="h-10 rounded-xl" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">E-mail</label>
            <Input defaultValue={user?.email} type="email" className="h-10 rounded-xl" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Téléphone</label>
            <Input placeholder="+213 5 00 00 00 00" className="h-10 rounded-xl" />
          </div>
          {user?.companyName ? (
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Entreprise</label>
              <Input defaultValue={user.companyName} disabled className="h-10 rounded-xl" />
            </div>
          ) : null}
        </div>

        {extraFields.length > 0 && (
          <>
            <p className="mt-7 text-xs font-bold uppercase tracking-wide text-muted-foreground">Informations professionnelles</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {extraFields.map((field) => (
                <div key={field.label}>
                  <label className="mb-2 block text-sm font-semibold text-foreground">{field.label}</label>
                  <Input defaultValue={field.defaultValue} className="h-10 rounded-xl" />
                </div>
              ))}
            </div>
          </>
        )}

        <p className="mt-7 text-xs font-bold uppercase tracking-wide text-muted-foreground">Sécurité</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Nouveau mot de passe</label>
            <Input type="password" placeholder="••••••••" className="h-10 rounded-xl" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Confirmer le mot de passe</label>
            <Input type="password" placeholder="••••••••" className="h-10 rounded-xl" />
          </div>
        </div>

        <Button className="mt-7 rounded-xl bg-[rgb(var(--intern-navy))] text-white">
          <Save className="h-4 w-4" />
          Enregistrer les modifications
        </Button>
      </Card>
    </>
  )
}