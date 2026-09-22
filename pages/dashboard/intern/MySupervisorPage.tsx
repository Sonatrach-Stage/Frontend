import { Link } from 'react-router-dom'
import { CalendarPlus, MessageSquare } from 'lucide-react'
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
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--intern-soft-blue))] text-lg font-black text-[rgb(var(--intern-navy))]">AB</div>
          <div>
            <p className="text-lg font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Ahmed Benali</p>
            <p className="text-sm text-muted-foreground">Encadrant de stage</p>
          </div>
        </div>
        <div className="mt-4 space-y-1 text-sm text-muted-foreground">
          <p>Entreprise : Atlas Telecom</p>
          <p>Email : ahmed.benali@atlas-telecom.ma</p>
          <p>Téléphone : +213 661 23 45 10</p>
          <p>Fonction : Architecte réseau senior</p>
          <p>Disponibilité : Lun–Ven, 9h–17h</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild className="rounded-xl bg-[rgb(var(--intern-navy))] text-white">
            <Link to="../messages"><MessageSquare className="h-4 w-4" /> Envoyer un message</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="../calendrier"><CalendarPlus className="h-4 w-4" /> Prendre rendez-vous</Link>
          </Button>
        </div>
      </Card>
    </>
  )
}