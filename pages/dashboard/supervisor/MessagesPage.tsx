import { useEffect, useState } from 'react'
import { Card } from '../../../lib/shadcn/card'
import { cn } from '../../../lib/shadcn/utils'
import { ChatWindow } from '../shared/ChatWindow'
import { getSupervisors } from '../../../api/adminsec'

export default function MessagesPage() {
  const [internNames, setInternNames] = useState<string[]>([])
  const [selected, setSelected] = useState<string>('')

  useEffect(() => {
    // ⚠️ Idéalement il faudrait GET /adminsec/interns/actives filtré sur "mes stagiaires affectés",
    // mais en attendant une route dédiée côté encadrant, laisse ce champ vide et saisis le nom manuellement.
  }, [])

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Messages</h1>
        <p className="mt-2 text-sm text-muted-foreground">Discutez avec vos stagiaires affectés.</p>
      </div>

      <div className="mx-auto max-w-2xl space-y-4">
        <Card className="rounded-2xl p-4 shadow-retool-sm">
          <label className="mb-2 block text-sm font-semibold text-foreground">Nom du stagiaire</label>
          <input
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            placeholder="Ex. Katia Benali"
            className="h-10 w-full rounded-xl border px-3 text-sm"
          />
        </Card>

        {selected && <ChatWindow contactName={selected} contactRole="Stagiaire affecté" />}
      </div>
    </>
  )
}