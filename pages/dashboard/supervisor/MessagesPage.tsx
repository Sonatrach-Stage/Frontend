import { useState } from 'react'
import { Card } from '../../../lib/shadcn/card'
import { cn } from '../../../lib/shadcn/utils'
import { ChatWindow } from '../shared/ChatWindow'
import { chatByIntern } from '../../data/dashboardMockData'
import { supervisorInterns } from '../../data/dashboardMockData'

export default function MessagesPage() {
  const [selected, setSelected] = useState(supervisorInterns[0]?.name ?? '')

  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Messages</h1>
        <p className="mt-2 text-sm text-muted-foreground"></p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="rounded-3xl p-4 shadow-retool-sm">
          <p className="mb-3 px-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Stagiaires</p>
          <div className="space-y-1">
            {supervisorInterns.map((intern) => (
              <button
                key={intern.name}
                type="button"
                onClick={() => setSelected(intern.name)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-muted',
                  selected === intern.name && 'bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-navy))]',
                )}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgb(var(--intern-navy))] text-xs font-black text-white">
                  {intern.name.slice(0, 2).toUpperCase()}
                </span>
                {intern.name}
              </button>
            ))}
          </div>
        </Card>

        <ChatWindow
          contactName={selected}
          contactRole="Stagiaire affecté"
          initialMessages={chatByIntern[selected] ?? []}
          currentRole="supervisor"
        />
      </div>
    </>
  )
}