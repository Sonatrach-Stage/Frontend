import { Mail } from 'lucide-react'
import { Card } from '../../../lib/shadcn/card'
import { Button } from '../../../lib/shadcn/button'

export default function MySupervisorPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Mon encadrant</h1>
      </div>

      <Card className="max-w-lg rounded-3xl p-6 shadow-retool-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--intern-soft-blue))] text-lg font-black text-[rgb(var(--intern-navy))]">
            AB
          </div>
          <div>
            <p className="text-lg font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Ahmed Benali</p>
            <p className="text-sm text-muted-foreground">Architecte réseau senior</p>
          </div>
        </div>
        <div className="mt-4 space-y-1 text-sm text-muted-foreground">
          <p>Département : Infrastructure</p>
          <p>Spécialisation : Réseaux & Cloud hybride</p>
          <p>12 ans d'expérience</p>
        </div>
        <Button className="mt-5 rounded-xl bg-[rgb(var(--intern-navy))] text-white">
          <Mail className="h-4 w-4" />
          Contacter mon encadrant
        </Button>
      </Card>
    </>
  )
}