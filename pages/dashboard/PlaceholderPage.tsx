import type { LucideIcon } from 'lucide-react'
import { Card } from '../../lib/shadcn/card'

export function PlaceholderPage({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <Card className="rounded-3xl p-10 text-center shadow-retool-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--intern-soft-blue))] text-[rgb(var(--intern-blue))] dark:bg-secondary">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </Card>
  )
}