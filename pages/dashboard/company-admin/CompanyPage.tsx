import { Building2 } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Input } from '../../../lib/shadcn/input'
import { Button } from '../../../lib/shadcn/button'
import { companyInfo } from '../../data/dashboardMockData'

export default function CompanyPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Entreprise</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
      </div>

      <Card className="max-w-2xl rounded-3xl p-8 shadow-retool-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgb(var(--intern-navy))] text-white">
            <Building2 className="h-7 w-7" />
          </div>
          <p className="text-lg font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{companyInfo.name}</p>
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-wide text-muted-foreground">Informations générales</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div><label className="mb-2 block text-sm font-semibold text-foreground">Nom</label><Input defaultValue={companyInfo.name} className="h-10 rounded-xl" /></div>
          <div><label className="mb-2 block text-sm font-semibold text-foreground">Site web</label><Input defaultValue={companyInfo.website} className="h-10 rounded-xl" /></div>
          <div className="sm:col-span-2"><label className="mb-2 block text-sm font-semibold text-foreground">Description</label><Input defaultValue={companyInfo.description} className="h-10 rounded-xl" /></div>
          <div><label className="mb-2 block text-sm font-semibold text-foreground">Adresse</label><Input defaultValue={companyInfo.address} className="h-10 rounded-xl" /></div>
          <div><label className="mb-2 block text-sm font-semibold text-foreground">Email</label><Input defaultValue={companyInfo.email} className="h-10 rounded-xl" /></div>
          <div><label className="mb-2 block text-sm font-semibold text-foreground">Téléphone</label><Input defaultValue={companyInfo.phone} className="h-10 rounded-xl" /></div>
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-wide text-muted-foreground">Informations administratives</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div><label className="mb-2 block text-sm font-semibold text-foreground">Numéro d'enregistrement</label><Input defaultValue={companyInfo.registrationNumber} className="h-10 rounded-xl" /></div>
          <div><label className="mb-2 block text-sm font-semibold text-foreground">Identifiant entreprise</label><Input defaultValue={companyInfo.companyId} disabled className="h-10 rounded-xl" /></div>
          <div><label className="mb-2 block text-sm font-semibold text-foreground">Date de création</label><Input defaultValue={companyInfo.createdAt} disabled className="h-10 rounded-xl" /></div>
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-wide text-muted-foreground">Informations de contact</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div><label className="mb-2 block text-sm font-semibold text-foreground">Responsable</label><Input defaultValue={companyInfo.contactName} className="h-10 rounded-xl" /></div>
          <div><label className="mb-2 block text-sm font-semibold text-foreground">Email</label><Input defaultValue={companyInfo.contactEmail} className="h-10 rounded-xl" /></div>
          <div><label className="mb-2 block text-sm font-semibold text-foreground">Téléphone</label><Input defaultValue={companyInfo.contactPhone} className="h-10 rounded-xl" /></div>
        </div>

        <Button className="mt-7 rounded-xl bg-[rgb(var(--intern-navy))] text-white">Modifier les informations</Button>
      </Card>
    </>
  )
}